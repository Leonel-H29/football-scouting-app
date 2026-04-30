import { Prisma, type PrismaClient } from '@prisma/client';
import { PrismaClientRepository } from '../../../../clients/prisma/prisma-client';
import {
  calculateAge,
  startOfTodayUtc,
} from '../../../../shared/timezones/date-utils';
import type { PlayerRepository } from '../../domain/repositories/player-repository.interface';
import type { PlayerSearchCriteria } from '../../domain/interfaces/player-search-criteria.interface';
import type { PlayerSearchPage } from '../../domain/interfaces/player-search-page.interface';
import type { PlayerComparisonCandidate } from '../../domain/interfaces/player-comparison-candidate.interface';
import type { Player } from '../../domain/interfaces/player.interface';
import type { PlayerStat } from '../../domain/interfaces/player-stat.interface';
import type { Team } from '../../../teams/domain/interfaces/team.interface';
import type { Season } from '../../../seasons/domain/interfaces/season.interface';
import type { PlayerPosition } from '../../domain/interfaces/player-position.interface';

type PrismaPlayerWithRelations = Prisma.PlayerGetPayload<{
  include: {
    currentTeam: true;
    stats: {
      include: {
        season: true;
      };
      orderBy: {
        season: {
          year: 'desc';
        };
      };
    };
  };
}>;

type PrismaPlayerStatWithSeason = Prisma.PlayerStatsGetPayload<{
  include: { season: true };
}>;

export class PrismaPlayerRepository
  extends PrismaClientRepository
  implements PlayerRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async search(criteria: PlayerSearchCriteria): Promise<PlayerSearchPage> {
    const where: Prisma.PlayerWhereInput = {};

    if (criteria.name !== undefined) {
      where.name = {
        contains: criteria.name,
        mode: 'insensitive',
      };
    }

    if (criteria.position !== undefined) {
      where.position = criteria.position;
    }

    if (criteria.nationality !== undefined) {
      where.nationality = {
        contains: criteria.nationality,
        mode: 'insensitive',
      };
    }

    if (
      criteria.birthDateFrom !== undefined ||
      criteria.birthDateTo !== undefined
    ) {
      where.birthDate = {
        ...(criteria.birthDateFrom === undefined
          ? {}
          : { gte: criteria.birthDateFrom }),
        ...(criteria.birthDateTo === undefined
          ? {}
          : { lte: criteria.birthDateTo }),
      };
    }

    const skip = (criteria.page - 1) * criteria.limit;

    const [totalItems, players] = await this.prisma.$transaction([
      this.prisma.player.count({ where }),
      this.prisma.player.findMany({
        where,
        include: {
          currentTeam: true,
          stats: {
            include: {
              season: true,
            },
            orderBy: {
              season: {
                year: 'desc',
              },
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
        skip,
        take: criteria.limit,
      }),
    ]);

    const totalPages =
      totalItems === 0 ? 0 : Math.ceil(totalItems / criteria.limit);

    return {
      data: players.map((player) => ({
        player: this.mapPlayer(player),
        latestStat: this.mapLatestStat(player),
      })),
      pagination: {
        page: criteria.page,
        limit: criteria.limit,
        totalItems,
        totalPages,
        hasNextPage: criteria.page < totalPages,
        hasPreviousPage: criteria.page > 1,
      },
    };
  }

  async findForComparison(
    playerIds: ReadonlyArray<string>
  ): Promise<ReadonlyArray<PlayerComparisonCandidate>> {
    const players = await this.prisma.player.findMany({
      where: {
        id: {
          in: [...playerIds],
        },
      },
      include: {
        currentTeam: true,
        stats: {
          include: {
            season: true,
          },
          orderBy: {
            season: {
              year: 'desc',
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const indexed = new Map(
      players.map((player) => [player.id, player] as const)
    );

    return playerIds.flatMap((playerId) => {
      const player = indexed.get(playerId);
      if (player === undefined) {
        return [];
      }

      return [
        {
          player: this.mapPlayer(player),
          stats: player.stats.map((stat) => this.mapPlayerStat(stat)),
        },
      ];
    });
  }

  private mapPlayer(player: PrismaPlayerWithRelations): Player {
    const referenceDate = startOfTodayUtc();
    const birthDate = new Date(player.birthDate);

    return {
      id: player.id,
      name: player.name,
      birthDate,
      age: calculateAge(birthDate, referenceDate),
      nationality: player.nationality,
      position: player.position as PlayerPosition,
      photoUrl: player.photoUrl,
      currentTeam: this.mapTeam(player.currentTeam),
    };
  }

  private mapLatestStat(player: PrismaPlayerWithRelations): PlayerStat | null {
    const latest = player.stats[0];
    return latest === undefined ? null : this.mapPlayerStat(latest);
  }

  private mapPlayerStat(stat: PrismaPlayerStatWithSeason): PlayerStat {
    return {
      season: this.mapSeason(stat.season),
      matchesPlayed: stat.matchesPlayed,
      starts: stat.starts,
      goals: stat.goals,
      assists: stat.assists,
      yellowCards: stat.yellowCards,
      redCards: stat.redCards,
      minutesPlayed: stat.minutesPlayed,
      shots: stat.shots,
      shotsOnTarget: stat.shotsOnTarget,
      keyPasses: stat.keyPasses,
      tackles: stat.tackles,
      interceptions: stat.interceptions,
      dribblesCompleted: stat.dribblesCompleted,
      passAccuracy: stat.passAccuracy,
    };
  }

  private mapTeam(team: {
    id: string;
    name: string;
    country: string;
    logoUrl: string;
  }): Team {
    return {
      id: team.id,
      name: team.name,
      country: team.country,
      logoUrl: team.logoUrl,
    };
  }

  private mapSeason(season: {
    id: string;
    year: number;
    name: string;
  }): Season {
    return {
      id: season.id,
      year: season.year,
      name: season.name,
    };
  }
}

import type { PrismaClient } from '@prisma/client';
import { PrismaClientRepository } from '../../../../clients/prisma/prisma-client';
import type { TeamRepository } from '../../domain/repositories/team-repository.interface';
import type { TeamFilterCriteria } from '../../domain/interfaces/team-filter-criteria.interface';
import type { Team } from '../../domain/interfaces/team.interface';

export class PrismaTeamRepository
  extends PrismaClientRepository
  implements TeamRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async list(criteria: TeamFilterCriteria): Promise<ReadonlyArray<Team>> {
    const teams = await this.prisma.team.findMany({
      where: {
        name:
          criteria.name === undefined
            ? undefined
            : {
                contains: criteria.name,
                mode: 'insensitive',
              },
        country:
          criteria.country === undefined
            ? undefined
            : {
                contains: criteria.country,
                mode: 'insensitive',
              },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return teams.map((team) => ({
      id: team.id,
      name: team.name,
      country: team.country,
      logoUrl: team.logoUrl,
    }));
  }

  async findById(teamId: string): Promise<Team | null> {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (team === null) {
      return null;
    }

    return {
      id: team.id,
      name: team.name,
      country: team.country,
      logoUrl: team.logoUrl,
    };
  }
}

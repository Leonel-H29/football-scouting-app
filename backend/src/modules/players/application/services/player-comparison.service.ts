import { BadRequestError } from '../../../../common/domain/errors/bad-request-error';
import { NotFoundError } from '../../../../common/domain/errors/not-found-error';
import { roundToOneDecimal } from '../../../../shared/timezones/date-utils';
import type { PlayerComparisonService } from './interfaces/player-comparison.service.interface';
import type { PlayerRepository } from '../../domain/repositories/player-repository.interface';
import type { PlayerComparisonResult } from '../../domain/interfaces/player-comparison-result.interface';
import type { PlayerComparisonRow } from '../../domain/interfaces/player-comparison-row.interface';
import type { PlayerComparisonValue } from '../../domain/interfaces/player-comparison-value.interface';
import type { PlayerStat } from '../../domain/interfaces/player-stat.interface';
import type { Season } from '../../domain/interfaces/season.interface';

type ComparisonsMetricKey =
  | 'matchesPlayed'
  | 'starts'
  | 'minutesPlayed'
  | 'goals'
  | 'assists'
  | 'yellowCards'
  | 'redCards'
  | 'shots'
  | 'shotsOnTarget'
  | 'keyPasses'
  | 'tackles'
  | 'interceptions'
  | 'dribblesCompleted'
  | 'passAccuracy';

const rowDefinitions: ReadonlyArray<{
  key: ComparisonsMetricKey | 'goalsPer90';
  label: string;
  better: 'higher' | 'lower';
  isDecimal?: boolean;
}> = [
  { key: 'matchesPlayed', label: 'Matches played', better: 'higher' },
  { key: 'starts', label: 'Starts', better: 'higher' },
  { key: 'minutesPlayed', label: 'Minutes played', better: 'higher' },
  { key: 'goals', label: 'Goals', better: 'higher' },
  { key: 'assists', label: 'Assists', better: 'higher' },
  { key: 'yellowCards', label: 'Yellow cards', better: 'lower' },
  { key: 'redCards', label: 'Red cards', better: 'lower' },
  { key: 'shots', label: 'Shots', better: 'higher' },
  { key: 'shotsOnTarget', label: 'Shots on target', better: 'higher' },
  { key: 'keyPasses', label: 'Key passes', better: 'higher' },
  { key: 'tackles', label: 'Tackles', better: 'higher' },
  { key: 'interceptions', label: 'Interceptions', better: 'higher' },
  { key: 'dribblesCompleted', label: 'Dribbles completed', better: 'higher' },
  {
    key: 'passAccuracy',
    label: 'Pass accuracy',
    better: 'higher',
    isDecimal: true,
  },
  {
    key: 'goalsPer90',
    label: 'Goals per 90',
    better: 'higher',
    isDecimal: true,
  },
];

export class PlayerComparisonServiceImpl implements PlayerComparisonService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async comparePlayers(
    playerIds: ReadonlyArray<string>,
    seasonId?: string
  ): Promise<PlayerComparisonResult> {
    if (playerIds.length < 2 || playerIds.length > 3) {
      throw new BadRequestError('Comparison supports only 2 or 3 players');
    }

    const candidates = await this.playerRepository.findForComparison(playerIds);

    if (candidates.length !== playerIds.length) {
      const foundIds = new Set(
        candidates.map((candidate) => candidate.player.id)
      );
      const missingIds = playerIds.filter((id) => !foundIds.has(id));
      throw new NotFoundError(`Players not found: ${missingIds.join(', ')}`);
    }

    const selectedSeason =
      seasonId !== undefined
        ? this.findExplicitSeason(candidates, seasonId)
        : this.findLatestCommonSeason(candidates);

    if (selectedSeason === null) {
      throw new NotFoundError(
        'No common season found for the requested players'
      );
    }

    const players = candidates.map((candidate) => candidate.player);
    const rows = rowDefinitions.map((definition) =>
      this.buildRow(definition, candidates, selectedSeason.id)
    );

    return {
      season: selectedSeason,
      players,
      rows,
    };
  }

  private findExplicitSeason(
    candidates: ReadonlyArray<{ stats: ReadonlyArray<PlayerStat> }>,
    seasonId: string
  ): Season | null {
    const firstCandidateSeason =
      candidates[0]?.stats.find((entry) => entry.season.id === seasonId)
        ?.season ?? null;
    if (firstCandidateSeason === null) {
      return null;
    }

    for (const candidate of candidates) {
      const hasSeason = candidate.stats.some(
        (entry) => entry.season.id === seasonId
      );
      if (!hasSeason) {
        return null;
      }
    }

    return firstCandidateSeason;
  }

  private findLatestCommonSeason(
    candidates: ReadonlyArray<{ stats: ReadonlyArray<PlayerStat> }>
  ): Season | null {
    const seasonMap = new Map<string, { season: Season; count: number }>();

    for (const candidate of candidates) {
      const seen = new Set<string>();

      for (const stat of candidate.stats) {
        if (seen.has(stat.season.id)) {
          continue;
        }

        seen.add(stat.season.id);
        const current = seasonMap.get(stat.season.id);

        if (current === undefined) {
          seasonMap.set(stat.season.id, { season: stat.season, count: 1 });
        } else {
          seasonMap.set(stat.season.id, {
            season: current.season,
            count: current.count + 1,
          });
        }
      }
    }

    const commonSeasons = Array.from(seasonMap.values()).filter(
      (entry) => entry.count === candidates.length
    );
    commonSeasons.sort((left, right) => right.season.year - left.season.year);

    return commonSeasons[0]?.season ?? null;
  }

  private buildRow(
    definition: {
      key: ComparisonsMetricKey | 'goalsPer90';
      label: string;
      better: 'higher' | 'lower';
      isDecimal?: boolean;
    },
    candidates: ReadonlyArray<{
      player: { id: string; name: string };
      stats: ReadonlyArray<PlayerStat>;
    }>,
    seasonId: string
  ): PlayerComparisonRow {
    const values: PlayerComparisonValue[] = candidates.map((candidate) => {
      const stat = candidate.stats.find(
        (entry) => entry.season.id === seasonId
      );
      const computedValue =
        stat === undefined
          ? null
          : definition.key === 'goalsPer90'
            ? this.calculateGoalsPer90(stat)
            : stat[definition.key];

      const value =
        definition.isDecimal && typeof computedValue === 'number'
          ? roundToOneDecimal(computedValue)
          : computedValue;

      return {
        playerId: candidate.player.id,
        playerName: candidate.player.name,
        value,
      };
    });

    return {
      key: definition.key,
      label: definition.label,
      values,
    };
  }

  private calculateGoalsPer90(stat: PlayerStat): number {
    if (stat.minutesPlayed === 0) {
      return 0;
    }

    return (stat.goals / stat.minutesPlayed) * 90;
  }
}

import { PlayerRepository } from '@/domain/ports/player.port';
import { CompareResult, PlayerListFilters, PlayerListItem, Season, Team } from '@/shared/types/domain';
import { Result, err, ok } from '@/shared/types/result';
import { clamp } from '@/shared/utils/format';
import { playerFixtures, seasonFixtures, teamFixtures } from '@/infrastructure/fixtures/players';

const statKeys = [
  'goals',
  'assists',
  'minutesPlayed',
  'shotsOnTarget',
  'keyPasses',
  'tackles',
  'interceptions',
  'dribblesCompleted',
  'passAccuracy',
] as const;

const createRows = (items: PlayerListItem[]): CompareResult['rows'] =>
  statKeys.map((key) => ({
    key,
    label: key === 'passAccuracy' ? 'Pass accuracy' : key.replace(/([A-Z])/g, ' $1').replace(/^./, (value) => value.toUpperCase()),
    values: items.map((item) => ({
      playerId: item.player.id,
      playerName: item.player.name,
      value: item.latestStat ? item.latestStat[key] : null,
    })),
  }));

export class MockPlayerRepository implements PlayerRepository {
  async search(filters: PlayerListFilters): Promise<Result<PlayerListItem[], string>> {
    const filtered = playerFixtures.filter((item) => {
      const matchesName = !filters.name || item.player.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesPosition = !filters.position || item.player.position === filters.position;
      const matchesNationality = !filters.nationality || item.player.nationality.toLowerCase().includes(filters.nationality.toLowerCase());
      const matchesMinAge = filters.minAge === undefined || item.player.age >= filters.minAge;
      const matchesMaxAge = filters.maxAge === undefined || item.player.age <= filters.maxAge;
      return matchesName && matchesPosition && matchesNationality && matchesMinAge && matchesMaxAge;
    });
    return ok(filtered);
  }

  async compare(playerIds: readonly string[], seasonId?: string): Promise<Result<CompareResult, string>> {
    const items = playerIds
      .map((id) => playerFixtures.find((item) => item.player.id === id))
      .filter((item): item is PlayerListItem => Boolean(item));

    if (items.length < 2) {
      return err('Select at least two players.');
    }

    const season = seasonId ? seasonFixtures.find((item) => item.id === seasonId) ?? null : items[0].latestStat?.season ?? null;
    const normalizedItems = items.map((item) => ({
      ...item,
      latestStat: item.latestStat && season && item.latestStat.season.id === season.id ? item.latestStat : item.latestStat,
    }));

    return ok({ season, players: normalizedItems.map((item) => item.player), rows: createRows(normalizedItems) });
  }

  async listSeasons(): Promise<Result<Season[], string>> {
    return ok(seasonFixtures);
  }

  async listTeams(): Promise<Result<Team[], string>> {
    return ok(teamFixtures);
  }
}

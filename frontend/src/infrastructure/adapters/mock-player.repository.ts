import { PlayerRepository } from '@/domain/ports/player.port';
import { CompareResult, PaginationMeta, PlayerListFilters, PlayerListItem, PlayerSearchResult, Season, Team } from '@/shared/types/domain';
import { Result, err, ok } from '@/shared/types/result';
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

const filterItems = (filters: PlayerListFilters): PlayerListItem[] =>
  playerFixtures.filter((item) => {
    const matchesName = !filters.name || item.player.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesPosition = !filters.position || item.player.position === filters.position;
    const matchesNationality = !filters.nationality || item.player.nationality.toLowerCase().includes(filters.nationality.toLowerCase());
    const matchesMinAge = filters.minAge === undefined || item.player.age >= filters.minAge;
    const matchesMaxAge = filters.maxAge === undefined || item.player.age <= filters.maxAge;
    return matchesName && matchesPosition && matchesNationality && matchesMinAge && matchesMaxAge;
  });

const buildPagination = (totalItems: number, page: number, limit: number): PaginationMeta => {
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  return {
    page: safePage,
    limit: safeLimit,
    totalItems,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPreviousPage: safePage > 1,
  };
};

export class MockPlayerRepository implements PlayerRepository {
  async search(filters: PlayerListFilters): Promise<Result<PlayerSearchResult, string>> {
    const filtered = filterItems(filters);
    const page = filters.page ?? 1;
    const limit = filters.limit === 'ALL' ? Math.max(1, filtered.length || 1) : (filters.limit ?? 10);
    const pagination = buildPagination(filtered.length, page, limit);
    const start = (pagination.page - 1) * pagination.limit;
    const items = pagination.limit >= filtered.length ? filtered : filtered.slice(start, start + pagination.limit);

    return ok({ items, pagination });
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

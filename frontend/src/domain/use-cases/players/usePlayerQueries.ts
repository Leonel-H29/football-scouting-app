import { PlayerRepository } from '@/domain/ports/player.port';
import { PlayerListFilters } from '@/shared/types/domain';

export const createPlayerQueries = (repository: PlayerRepository) => ({
  search: (filters: PlayerListFilters) => repository.search(filters),
  compare: (playerIds: readonly string[], seasonId?: string) => repository.compare(playerIds, seasonId),
  listSeasons: () => repository.listSeasons(),
  listTeams: () => repository.listTeams(),
});

import { CompareResult, PlayerLatestStat, PlayerListFilters, PlayerListItem, Season, Team } from '@/shared/types/domain';
import { Result } from '@/shared/types/result';

export interface PlayerRepository {
  search(filters: PlayerListFilters): Promise<Result<PlayerListItem[], string>>;
  compare(playerIds: readonly string[], seasonId?: string): Promise<Result<CompareResult, string>>;
  listSeasons(): Promise<Result<Season[], string>>;
  listTeams(): Promise<Result<Team[], string>>;
}

export interface FavoritePlayersRepository {
  list(): readonly string[];
  toggle(playerId: string): readonly string[];
  isFavorite(playerId: string): boolean;
}

export interface PlayerCatalogRepository {
  getLatestStat(playerId: string): PlayerLatestStat | null;
}

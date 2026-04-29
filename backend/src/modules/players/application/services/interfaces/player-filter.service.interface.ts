import type { SearchPlayersQuery } from '../../../domain/interfaces/search-players-query.interface';
import type { PlayerSearchCriteria } from '../../../domain/interfaces/player-search-criteria.interface';

export interface PlayerFilterService {
  buildCriteria(dto: SearchPlayersQuery): PlayerSearchCriteria;
}

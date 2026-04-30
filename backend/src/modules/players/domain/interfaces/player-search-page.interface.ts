import type { PlayerSearchPagination } from './player-search-pagination.interface';
import type { PlayerSearchResult } from './player-search-result.interface';

export interface PlayerSearchPage {
  readonly data: ReadonlyArray<PlayerSearchResult>;
  readonly pagination: PlayerSearchPagination;
}

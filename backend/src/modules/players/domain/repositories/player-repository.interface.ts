import type { PlayerComparisonCandidate } from '../interfaces/player-comparison-candidate.interface';
import type { PlayerSearchCriteria } from '../interfaces/player-search-criteria.interface';
import type { PlayerSearchPage } from '../interfaces/player-search-page.interface';

export interface PlayerRepository {
  search(criteria: PlayerSearchCriteria): Promise<PlayerSearchPage>;
  findForComparison(
    playerIds: ReadonlyArray<string>
  ): Promise<ReadonlyArray<PlayerComparisonCandidate>>;
}

import type { PlayerComparisonCandidate } from '../interfaces/player-comparison-candidate.interface';
import type { PlayerSearchCriteria } from '../interfaces/player-search-criteria.interface';
import type { PlayerSearchResult } from '../interfaces/player-search-result.interface';

export interface PlayerRepository {
  search(
    criteria: PlayerSearchCriteria
  ): Promise<ReadonlyArray<PlayerSearchResult>>;
  findForComparison(
    playerIds: ReadonlyArray<string>
  ): Promise<ReadonlyArray<PlayerComparisonCandidate>>;
}

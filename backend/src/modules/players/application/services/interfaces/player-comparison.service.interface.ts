import type { PlayerComparisonResult } from '../../../domain/interfaces/player-comparison-result.interface';

export interface PlayerComparisonService {
  comparePlayers(
    playerIds: ReadonlyArray<string>,
    seasonId?: string
  ): Promise<PlayerComparisonResult>;
}

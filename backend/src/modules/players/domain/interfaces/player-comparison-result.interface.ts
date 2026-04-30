import type { Player } from './player.interface';
import type { PlayerComparisonRow } from './player-comparison-row.interface';
import type { Season } from '../../../seasons/domain/interfaces/season.interface';

export interface PlayerComparisonResult {
  readonly season: Season | null;
  readonly players: ReadonlyArray<Player>;
  readonly rows: ReadonlyArray<PlayerComparisonRow>;
}

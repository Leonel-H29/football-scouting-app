import type { Player } from './player.interface';
import type { PlayerStat } from './player-stat.interface';

export interface PlayerSearchResult {
  readonly player: Player;
  readonly latestStat: PlayerStat | null;
}

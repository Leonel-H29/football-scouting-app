import type { Player } from './player.interface';
import type { PlayerStat } from './player-stat.interface';

export interface PlayerComparisonCandidate {
  readonly player: Player;
  readonly stats: ReadonlyArray<PlayerStat>;
}

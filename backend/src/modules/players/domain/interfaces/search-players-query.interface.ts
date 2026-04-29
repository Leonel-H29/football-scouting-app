import type { PlayerPosition } from './player-position.interface';

export interface SearchPlayersQuery {
  readonly name?: string;
  readonly position?: PlayerPosition;
  readonly nationality?: string;
  readonly minAge?: number;
  readonly maxAge?: number;
}

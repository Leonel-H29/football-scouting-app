import type { PlayerPosition } from './player-position.interface';

export interface PlayerSearchCriteria {
  readonly name?: string;
  readonly position?: PlayerPosition;
  readonly nationality?: string;
  readonly birthDateFrom?: Date;
  readonly birthDateTo?: Date;
  readonly page: number;
  readonly limit: number;
}

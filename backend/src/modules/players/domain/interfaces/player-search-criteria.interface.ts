import { PlayerPositionEnum } from '../enums/player-position.enum';

export interface PlayerSearchCriteria {
  readonly name?: string;
  readonly position?: PlayerPositionEnum;
  readonly nationality?: string;
  readonly birthDateFrom?: Date;
  readonly birthDateTo?: Date;
  readonly page: number;
  readonly limit: number;
}

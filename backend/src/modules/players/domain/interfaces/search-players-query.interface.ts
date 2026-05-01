import { PlayerPositionEnum } from '../enums/player-position.enum';

export interface SearchPlayersQuery {
  readonly name?: string;
  readonly position?: PlayerPositionEnum;
  readonly nationality?: string;
  readonly minAge?: number;
  readonly maxAge?: number;
  readonly page?: number;
  readonly limit?: number;
}

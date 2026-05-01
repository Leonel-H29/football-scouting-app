import type { Team } from '../../../teams/domain/interfaces/team.interface';
import { PlayerPositionEnum } from '../enums/player-position.enum';

export interface Player {
  readonly id: string;
  readonly name: string;
  readonly birthDate: Date;
  readonly age: number;
  readonly nationality: string;
  readonly position: PlayerPositionEnum;
  readonly photoUrl: string;
  readonly currentTeam: Team;
}

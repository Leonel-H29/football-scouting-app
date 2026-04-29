import type { PlayerPosition } from './player-position.interface';
import type { TeamSummary } from './team-summary.interface';

export interface Player {
  readonly id: string;
  readonly name: string;
  readonly birthDate: Date;
  readonly age: number;
  readonly nationality: string;
  readonly position: PlayerPosition;
  readonly photoUrl: string;
  readonly currentTeam: TeamSummary;
}

import type { Season } from './season.interface';

export interface PlayerStat {
  readonly season: Season;
  readonly matchesPlayed: number;
  readonly starts: number;
  readonly goals: number;
  readonly assists: number;
  readonly yellowCards: number;
  readonly redCards: number;
  readonly minutesPlayed: number;
  readonly shots: number;
  readonly shotsOnTarget: number;
  readonly keyPasses: number;
  readonly tackles: number;
  readonly interceptions: number;
  readonly dribblesCompleted: number;
  readonly passAccuracy: number;
}

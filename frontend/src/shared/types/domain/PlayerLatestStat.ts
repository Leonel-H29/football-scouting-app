import { Season } from '@/shared/types/domain/Season';

export interface PlayerLatestStat {
  season: Season;
  matchesPlayed: number;
  starts: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  shots: number;
  shotsOnTarget: number;
  keyPasses: number;
  tackles: number;
  interceptions: number;
  dribblesCompleted: number;
  passAccuracy: number;
}

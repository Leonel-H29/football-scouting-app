import type { PlayerComparisonValue } from './player-comparison-value.interface';

export interface PlayerComparisonRow {
  readonly key: string;
  readonly label: string;
  readonly values: ReadonlyArray<PlayerComparisonValue>;
}

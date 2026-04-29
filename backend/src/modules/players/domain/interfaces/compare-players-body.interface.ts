export interface ComparePlayersBody {
  readonly playerIds: ReadonlyArray<string>;
  readonly seasonId?: string;
}

import type { ListSeasonsQuery } from './list-seasons-query.interface';
import type { Season } from './season.interface';

export interface SeasonListService {
  list(criteria: ListSeasonsQuery): Promise<ReadonlyArray<Season>>;
}

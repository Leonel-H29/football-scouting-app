import type { ListSeasonsQuery } from '../../../domain/interfaces/list-seasons-query.interface';
import type { Season } from '../../../domain/interfaces/season.interface';

export interface SeasonListService {
  list(criteria: ListSeasonsQuery): Promise<ReadonlyArray<Season>>;
}

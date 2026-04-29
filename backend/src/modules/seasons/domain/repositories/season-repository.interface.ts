import type { SeasonFilterCriteria } from '../interfaces/season-filter-criteria.interface';
import type { Season } from '../interfaces/season.interface';

export interface SeasonRepository {
  list(criteria: SeasonFilterCriteria): Promise<ReadonlyArray<Season>>;
  findById(seasonId: string): Promise<Season | null>;
}

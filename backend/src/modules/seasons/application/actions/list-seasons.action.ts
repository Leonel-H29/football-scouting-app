import type { SeasonListService } from '../../domain/interfaces/season-list.service.interface';
import type { ListSeasonsQuery } from '../../domain/interfaces/list-seasons-query.interface';
import type { Season } from '../../domain/interfaces/season.interface';

export class ListSeasonsAction {
  constructor(private readonly seasonListService: SeasonListService) {}

  async execute(criteria: ListSeasonsQuery): Promise<ReadonlyArray<Season>> {
    return this.seasonListService.list(criteria);
  }
}

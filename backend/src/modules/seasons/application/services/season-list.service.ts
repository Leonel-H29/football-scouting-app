import type { SeasonListService } from './interfaces/season-list.service.interface';
import type { SeasonRepository } from '../../domain/repositories/season-repository.interface';
import type { ListSeasonsQuery } from '../../domain/interfaces/list-seasons-query.interface';
import type { Season } from '../../domain/interfaces/season.interface';

export class SeasonListServiceImpl implements SeasonListService {
  constructor(private readonly seasonRepository: SeasonRepository) {}

  async list(criteria: ListSeasonsQuery): Promise<ReadonlyArray<Season>> {
    const filters = {
      ...(criteria.year !== undefined ? { year: criteria.year } : {}),
      ...(criteria.name?.trim() ? { name: criteria.name.trim() } : {}),
    };

    const seasons = await this.seasonRepository.list(filters);

    return [...seasons].sort((left, right) => right.year - left.year);
  }
}

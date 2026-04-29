import type { SeasonListService } from '../../domain/interfaces/season-list.service.interface';
import type { SeasonRepository } from '../../domain/repositories/season-repository.interface';
import type { ListSeasonsQuery } from '../../domain/interfaces/list-seasons-query.interface';
import type { Season } from '../../domain/interfaces/season.interface';

export class SeasonListServiceImpl implements SeasonListService {
  constructor(private readonly seasonRepository: SeasonRepository) {}

  async list(criteria: ListSeasonsQuery): Promise<ReadonlyArray<Season>> {
    const seasons = await this.seasonRepository.list({
      year: criteria.year,
      name: criteria.name?.trim(),
    });

    return [...seasons].sort((left, right) => right.year - left.year);
  }
}

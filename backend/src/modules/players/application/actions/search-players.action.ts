import type { PlayerFilterService } from '../services/interfaces/player-filter.service.interface';
import type { PlayerRepository } from '../../domain/repositories/player-repository.interface';
import type { SearchPlayersQuery } from '../../domain/interfaces/search-players-query.interface';
import type { PlayerSearchResult } from '../../domain/interfaces/player-search-result.interface';

export class SearchPlayersAction {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly playerFilterService: PlayerFilterService
  ) {}

  async execute(
    dto: SearchPlayersQuery
  ): Promise<ReadonlyArray<PlayerSearchResult>> {
    const criteria = this.playerFilterService.buildCriteria(dto);
    return this.playerRepository.search(criteria);
  }
}

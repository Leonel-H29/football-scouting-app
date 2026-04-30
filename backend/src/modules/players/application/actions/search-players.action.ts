import type { PlayerFilterService } from '../services/interfaces/player-filter.service.interface';
import type { PlayerRepository } from '../../domain/repositories/player-repository.interface';
import type { SearchPlayersQuery } from '../../domain/interfaces/search-players-query.interface';
import type { PlayerSearchPage } from '../../domain/interfaces/player-search-page.interface';

export class SearchPlayersAction {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly playerFilterService: PlayerFilterService
  ) {}

  async execute(dto: SearchPlayersQuery): Promise<PlayerSearchPage> {
    const criteria = this.playerFilterService.buildCriteria(dto);
    return this.playerRepository.search(criteria);
  }
}

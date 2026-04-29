import { SearchPlayersAction } from '../../../src/modules/players/application/actions/search-players.action';
import type { PlayerFilterService } from '../../../src/modules/players/application/services/interfaces/player-filter.service.interface';
import type { PlayerRepository } from '../../../src/modules/players/domain/repositories/player-repository.interface';
import type { PlayerSearchCriteria } from '../../../src/modules/players/domain/interfaces/player-search-criteria.interface';

describe('SearchPlayersAction', () => {
  it('delegates to filter service and repository', async () => {
    const criteria: PlayerSearchCriteria = {
      name: 'Leo',
    };

    const repository: PlayerRepository = {
      search: jest.fn().mockResolvedValue([]),
      findForComparison: jest.fn(),
    };

    const filterService: PlayerFilterService = {
      buildCriteria: jest.fn().mockReturnValue(criteria),
    };

    const action = new SearchPlayersAction(repository, filterService);
    await action.execute({
      name: 'Leo',
      position: 'FORWARD',
    });

    expect(filterService.buildCriteria).toHaveBeenCalledWith({
      name: 'Leo',
      position: 'FORWARD',
    });
    expect(repository.search).toHaveBeenCalledWith(criteria);
  });
});

import { ListSeasonsAction } from '../../../src/modules/seasons/application/actions/list-seasons.action';
import type { SeasonListService } from '../../../src/modules/seasons/domain/interfaces/season-list.service.interface';

describe('ListSeasonsAction', () => {
  it('delegates to the season list service', async () => {
    const service: SeasonListService = {
      list: jest.fn().mockResolvedValue([])
    };

    const action = new ListSeasonsAction(service);
    await action.execute({ year: 2024 });

    expect(service.list).toHaveBeenCalledWith({ year: 2024 });
  });
});

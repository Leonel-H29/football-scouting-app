import { ListTeamsAction } from '../../../src/modules/teams/application/actions/list-teams.action';
import type { TeamListService } from '../../../src/modules/teams/application/services/interfaces/team-list.service.interface';

describe('ListTeamsAction', () => {
  it('delegates to the team list service', async () => {
    const service: TeamListService = {
      list: jest.fn().mockResolvedValue([]),
    };

    const action = new ListTeamsAction(service);
    await action.execute({ country: 'Argentina' });

    expect(service.list).toHaveBeenCalledWith({ country: 'Argentina' });
  });
});

import { TeamListServiceImpl } from '../../../src/modules/teams/application/services/team-list.service';
import type { TeamRepository } from '../../../src/modules/teams/domain/repositories/team-repository.interface';

describe('TeamListServiceImpl', () => {
  it('sorts teams by name', async () => {
    const repository: TeamRepository = {
      list: jest.fn().mockResolvedValue([
        { id: '2', name: 'B Team', country: 'Argentina', logoUrl: 'b' },
        { id: '1', name: 'A Team', country: 'Argentina', logoUrl: 'a' },
      ]),
      findById: jest.fn(),
    };

    const service = new TeamListServiceImpl(repository);
    const teams = await service.list({});

    expect(teams.map((team) => team.name)).toEqual(['A Team', 'B Team']);
  });
});

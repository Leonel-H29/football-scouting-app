import { SeasonListServiceImpl } from '../../../src/modules/seasons/application/services/season-list.service';
import type { SeasonRepository } from '../../../src/modules/seasons/domain/repositories/season-repository.interface';

describe('SeasonListServiceImpl', () => {
  it('sorts seasons by year descending', async () => {
    const repository: SeasonRepository = {
      list: jest.fn().mockResolvedValue([
        { id: '1', year: 2023, name: '2023/24' },
        { id: '2', year: 2024, name: '2024/25' },
      ]),
      findById: jest.fn(),
    };

    const service = new SeasonListServiceImpl(repository);
    const seasons = await service.list({});

    expect(seasons.map((season) => season.year)).toEqual([2024, 2023]);
  });
});

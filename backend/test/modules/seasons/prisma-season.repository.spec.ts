import { PrismaSeasonRepository } from '../../../src/modules/seasons/infrastructure/repositories/prisma-season.repository';
import type { PrismaClient } from '@prisma/client';

describe('PrismaSeasonRepository', () => {
  it('builds a filtered season query', async () => {
    const findMany = jest.fn().mockResolvedValue([]);
    const prisma = {
      season: {
        findMany,
      },
    } as unknown as PrismaClient;

    const repository = new PrismaSeasonRepository(prisma);
    await repository.list({ year: 2024 });

    expect(findMany).toHaveBeenCalledTimes(1);
  });
});

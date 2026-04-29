import { PrismaTeamRepository } from '../../../src/modules/teams/infrastructure/repositories/prisma-team.repository';
import type { PrismaClient } from '@prisma/client';

describe('PrismaTeamRepository', () => {
  it('builds a filtered team query', async () => {
    const findMany = jest.fn().mockResolvedValue([]);
    const prisma = {
      team: {
        findMany,
      },
    } as unknown as PrismaClient;

    const repository = new PrismaTeamRepository(prisma);
    await repository.list({ name: 'River', country: 'Argentina' });

    expect(findMany).toHaveBeenCalledTimes(1);
  });
});

import { PrismaPlayerRepository } from '../../../src/modules/players/infrastructure/repositories/prisma-player.repository';
import type { PrismaClient } from '@prisma/client';

describe('PrismaPlayerRepository', () => {
  it('builds the expected prisma query for search', async () => {
    const findMany = jest.fn().mockResolvedValue([]);
    const prisma = {
      player: {
        findMany,
      },
    } as unknown as PrismaClient;

    const repository = new PrismaPlayerRepository(prisma);
    await repository.search({
      name: 'Leo',
      nationality: 'Argentina',
      position: 'FORWARD',
      birthDateFrom: new Date('1990-01-01T00:00:00.000Z'),
      birthDateTo: new Date('2000-01-01T00:00:00.000Z'),
    });

    expect(findMany).toHaveBeenCalledTimes(1);
    const query = findMany.mock.calls[0][0] as {
      where: { name: { contains: string }; nationality: { contains: string } };
    };
    expect(query.where.name.contains).toBe('Leo');
    expect(query.where.nationality.contains).toBe('Argentina');
  });
});

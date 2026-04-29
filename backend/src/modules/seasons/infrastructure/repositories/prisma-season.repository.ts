import type { PrismaClient } from '@prisma/client';
import { PrismaClientRepository } from '../../../../clients/prisma/prisma-client';
import type { SeasonRepository } from '../../domain/repositories/season-repository.interface';
import type { SeasonFilterCriteria } from '../../domain/interfaces/season-filter-criteria.interface';
import type { Season } from '../../domain/interfaces/season.interface';

export class PrismaSeasonRepository
  extends PrismaClientRepository
  implements SeasonRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async list(criteria: SeasonFilterCriteria): Promise<ReadonlyArray<Season>> {
    const where = {
      ...(criteria.year !== undefined ? { year: criteria.year } : {}),
      ...(criteria.name !== undefined
        ? { name: { contains: criteria.name, mode: 'insensitive' as const } }
        : {}),
    };

    const seasons = await this.prisma.season.findMany({
      where,
      orderBy: {
        year: 'desc',
      },
    });

    return seasons.map((season) => ({
      id: season.id,
      year: season.year,
      name: season.name,
    }));
  }

  async findById(seasonId: string): Promise<Season | null> {
    const season = await this.prisma.season.findUnique({
      where: { id: seasonId },
    });

    if (season === null) {
      return null;
    }

    return {
      id: season.id,
      year: season.year,
      name: season.name,
    };
  }
}

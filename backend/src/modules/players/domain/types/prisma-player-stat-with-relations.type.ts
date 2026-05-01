import { Prisma } from '@prisma/client';

export type PrismaPlayerStatWithSeason = Prisma.PlayerStatsGetPayload<{
  include: { season: true };
}>;

import { Prisma } from '@prisma/client';

export type PrismaPlayersWithRelations = Prisma.PlayerGetPayload<{
  include: {
    currentTeam: true;
    stats: {
      include: {
        season: true;
      };
      orderBy: {
        season: {
          year: 'desc';
        };
      };
    };
  };
}>;

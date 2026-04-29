import { PrismaClient } from '@prisma/client';
import { config } from '../../config/config';

const globalForPrisma = globalThis as typeof globalThis & {
  prismaClient?: PrismaClient;
};

export const prismaClient: PrismaClient =
  globalForPrisma.prismaClient ?? new PrismaClient({
    log: config.nodeEnv === 'production' ? ['error'] : ['warn', 'error']
  });

if (config.nodeEnv !== 'production') {
  globalForPrisma.prismaClient = prismaClient;
}

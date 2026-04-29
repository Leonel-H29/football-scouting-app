import type { Prisma, PrismaClient } from '@prisma/client';

export abstract class PrismaClientRepository {
  protected constructor(protected readonly prisma: PrismaClient) {}

  protected async run<T>(
    operation: (client: PrismaClient) => Promise<T>
  ): Promise<T> {
    return operation(this.prisma);
  }

  protected async transaction<T>(
    operation: (client: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return this.prisma.$transaction((client) => operation(client));
  }
}

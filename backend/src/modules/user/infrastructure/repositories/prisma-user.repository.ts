import type { PrismaClient } from '@prisma/client';
import { PrismaClientRepository } from '../../../../clients/prisma/prisma-client';
import type { CreateUserInput } from '../../domain/interfaces/create-user-input.interface';
import type { UpdateUserInput } from '../../domain/interfaces/update-user-input.interface';
import type { User } from '../../../user/domain/interfaces/user.interface';
import type { UserRepository } from '../../domain/repositories/user.repository';

export class PrismaUserRepository
  extends PrismaClientRepository
  implements UserRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateById(id: string, data: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}

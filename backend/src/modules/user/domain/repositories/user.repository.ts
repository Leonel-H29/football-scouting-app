import type { CreateUserInput } from '../interfaces/create-user-input.interface';
import type { UpdateUserInput } from '../interfaces/update-user-input.interface';
import type { User } from '../../../user/domain/interfaces/user.interface';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(data: CreateUserInput): Promise<User>;
  updateById(id: string, data: UpdateUserInput): Promise<User>;
}

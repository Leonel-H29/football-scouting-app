import type { CreateUserInput } from '../interfaces/create-user-input.interface';
import type { User } from '../interfaces/user.interface';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(data: CreateUserInput): Promise<User>;
}

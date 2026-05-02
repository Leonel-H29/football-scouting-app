import { NotFoundError } from '../../../../common/domain/errors/not-found-error';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { PasswordByEmailResult } from './interfaces/password-by-email-result.interface';

export class GetUserPasswordByEmailAction {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(email: string): Promise<PasswordByEmailResult> {
    const user = await this.userRepo.findByEmail(email);
    if (user === null) {
      throw new NotFoundError('User not found');
    }

    return {
      email: user.email,
      passwordHash: user.password,
    };
  }
}

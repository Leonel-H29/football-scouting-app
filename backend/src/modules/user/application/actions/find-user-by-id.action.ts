import { NotFoundError } from '../../../../common/domain/errors/not-found-error';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { UserResult } from './interfaces/user-result.interface';
import { toUserResult } from './mappers/to-user-result.mapper';

export class FindUserByIdAction {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<UserResult> {
    const user = await this.userRepo.findById(id);
    if (user === null) {
      throw new NotFoundError('User not found');
    }

    return toUserResult(user);
  }
}

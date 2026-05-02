import { BadRequestError } from '../../../../common/domain/errors/bad-request-error';
import { ConflictError } from '../../../../common/domain/errors/conflict-error';
import { NotFoundError } from '../../../../common/domain/errors/not-found-error';
import type { UpdateUserDto } from '../../domain/dto/update-user.dto';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { PasswordHasher } from '../../../auth/application/services/interfaces/password-hasher.interface';
import type { UserResult } from './interfaces/user-result.interface';
import { toUserResult } from './mappers/to-user-result.mapper';

export class UpdateUserAction {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UserResult> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestError('Passwords do not match');
    }

    const currentUser = await this.userRepo.findById(id);
    if (currentUser === null) {
      throw new NotFoundError('User not found');
    }

    if (dto.email !== currentUser.email) {
      const userByEmail = await this.userRepo.findByEmail(dto.email);
      if (userByEmail !== null && userByEmail.id !== id) {
        throw new ConflictError('Email is already registered');
      }
    }

    if (dto.username !== currentUser.username) {
      const userByUsername = await this.userRepo.findByUsername(dto.username);
      if (userByUsername !== null && userByUsername.id !== id) {
        throw new ConflictError('Username is already taken');
      }
    }

    const passwordHash = await this.passwordHasher.hash(dto.password);

    const updatedUser = await this.userRepo.updateById(id, {
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      username: dto.username,
      password: passwordHash,
    });

    return toUserResult(updatedUser);
  }
}

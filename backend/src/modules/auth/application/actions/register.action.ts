import { ConflictError } from '../../../../common/domain/errors/conflict-error';
import { BadRequestError } from '../../../../common/domain/errors/bad-request-error';
import type { RegisterDto } from '../../domain/dto/register.dto';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { PasswordHasher } from '../services/interfaces/password-hasher.interface';
import { RegisterResult } from '../actions/interfaces/register-result.interface';

export class RegisterAction {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(dto: RegisterDto): Promise<RegisterResult> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestError('Passwords do not match');
    }

    const existingByEmail = await this.userRepo.findByEmail(dto.email);
    if (existingByEmail !== null) {
      throw new ConflictError('Email is already registered');
    }

    const existingByUsername = await this.userRepo.findByUsername(dto.username);
    if (existingByUsername !== null) {
      throw new ConflictError('Username is already taken');
    }

    const passwordHash = await this.passwordHasher.hash(dto.password);

    const created = await this.userRepo.create({
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      username: dto.username,
      password: passwordHash,
    });

    return {
      id: created.id,
      name: created.name,
      surname: created.surname,
      email: created.email,
      username: created.username,
    };
  }
}

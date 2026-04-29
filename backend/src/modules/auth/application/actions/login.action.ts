import { UnauthorizedError } from '../../../../common/domain/errors/unauthorized-error';
import type { LoginDto } from '../../domain/dto/login.dto';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { PasswordHasher } from '../services/interfaces/password-hasher.interface';
import type { TokenService } from '../services/interfaces/token-service.interface';
import { LoginResult } from '../actions/interfaces/login-result.interface';

export class LoginAction {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService
  ) {}

  async execute(dto: LoginDto): Promise<LoginResult> {
    const user = await this.userRepo.findByUsername(dto.username);
    if (user === null) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const validPassword = await this.passwordHasher.compare(
      dto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const accessToken = this.tokenService.sign({
      sub: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
    };
  }
}

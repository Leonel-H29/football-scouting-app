import { LoginAction } from '../../../src/modules/auth/application/actions/login.action';
import type { UserRepository } from '../../../src/modules/auth/domain/repositories/user.repository';
import type { PasswordHasher } from '../../../src/modules/auth/application/services/interfaces/password-hasher.interface';
import type { TokenService } from '../../../src/modules/auth/application/services/interfaces/token-service.interface';

describe('LoginAction', () => {
  it('returns JWT token for valid credentials', async () => {
    const userRepo: UserRepository = {
      findByEmail: jest.fn(),
      findByUsername: jest.fn().mockResolvedValue({
        id: 'u1',
        name: 'Leo',
        surname: 'Messi',
        email: 'leo@example.com',
        username: 'leo10',
        passwordHash: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      create: jest.fn(),
    };

    const passwordHasher: PasswordHasher = {
      hash: jest.fn(),
      compare: jest.fn().mockResolvedValue(true),
    };

    const tokenService: TokenService = {
      sign: jest.fn().mockReturnValue('jwt-token'),
      verify: jest.fn(),
    };

    const action = new LoginAction(userRepo, passwordHasher, tokenService);
    const result = await action.execute({
      username: 'leo10',
      password: 'StrongPass1!',
    });

    expect(result.accessToken).toBe('jwt-token');
    expect(result.tokenType).toBe('Bearer');
  });
});

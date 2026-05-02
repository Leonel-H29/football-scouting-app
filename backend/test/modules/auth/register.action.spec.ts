import { RegisterAction } from '../../../src/modules/auth/application/actions/register.action';
import type { UserRepository } from '../../../src/modules/auth/domain/repositories/user.repository';
import type { PasswordHasher } from '../../../src/modules/auth/application/services/interfaces/password-hasher.interface';

describe('RegisterAction', () => {
  it('registers a user successfully', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn().mockResolvedValue(null),
      findByEmail: jest.fn().mockResolvedValue(null),
      findByUsername: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({
        id: 'u1',
        name: 'Leo',
        surname: 'Messi',
        email: 'leo@example.com',
        username: 'leo10',
        password: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      updateById: jest.fn(),
    };

    const passwordHasher: PasswordHasher = {
      hash: jest.fn().mockResolvedValue('hash'),
      compare: jest.fn(),
    };

    const action = new RegisterAction(userRepo, passwordHasher);
    const result = await action.execute({
      name: 'Leo',
      surname: 'Messi',
      email: 'leo@example.com',
      username: 'leo10',
      password: 'StrongPass1!',
      confirmPassword: 'StrongPass1!',
    });

    expect(result.email).toBe('leo@example.com');
    expect(passwordHasher.hash).toHaveBeenCalledWith('StrongPass1!');
  });
});

import { NotFoundError } from '../../../src/common/domain/errors/not-found-error';
import { GetUserPasswordByEmailAction } from '../../../src/modules/user/application/actions/get-user-password-by-email.action';
import type { UserRepository } from '../../../src/modules/user/domain/repositories/user.repository';

describe('GetUserPasswordByEmailAction', () => {
  it('returns password hash for existing email', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Leo',
        surname: 'Messi',
        email: 'leo@example.com',
        username: 'leo10',
        password: 'hashed-password',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findByUsername: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
    };

    const action = new GetUserPasswordByEmailAction(userRepo);
    const result = await action.execute('leo@example.com');

    expect(result).toEqual({
      email: 'leo@example.com',
      passwordHash: 'hashed-password',
    });
  });

  it('throws when user is not found', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue(null),
      findByUsername: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
    };

    const action = new GetUserPasswordByEmailAction(userRepo);

    await expect(action.execute('missing@example.com')).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});

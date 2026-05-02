import { NotFoundError } from '../../../src/common/domain/errors/not-found-error';
import { FindUserByEmailAction } from '../../../src/modules/user/application/actions/find-user-by-email.action';
import { FindUserByIdAction } from '../../../src/modules/user/application/actions/find-user-by-id.action';
import type { UserRepository } from '../../../src/modules/user/domain/repositories/user.repository';

describe('FindUser actions', () => {
  it('finds a user by id', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn().mockResolvedValue({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Leo',
        surname: 'Messi',
        email: 'leo@example.com',
        username: 'leo10',
        password: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findByEmail: jest.fn(),
      findByUsername: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
    };

    const action = new FindUserByIdAction(userRepo);
    const result = await action.execute('550e8400-e29b-41d4-a716-446655440000');

    expect(result.username).toBe('leo10');
    expect(result).not.toHaveProperty('password');
  });

  it('finds a user by email', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue({
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Alexia',
        surname: 'Putellas',
        email: 'alexia@example.com',
        username: 'alexia11',
        password: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findByUsername: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
    };

    const action = new FindUserByEmailAction(userRepo);
    const result = await action.execute('alexia@example.com');

    expect(result.email).toBe('alexia@example.com');
    expect(result).not.toHaveProperty('password');
  });

  it('throws when user does not exist', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn().mockResolvedValue(null),
      findByEmail: jest.fn().mockResolvedValue(null),
      findByUsername: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
    };

    await expect(
      new FindUserByIdAction(userRepo).execute('550e8400-e29b-41d4-a716-446655440002')
    ).rejects.toBeInstanceOf(NotFoundError);

    await expect(
      new FindUserByEmailAction(userRepo).execute('missing@example.com')
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});

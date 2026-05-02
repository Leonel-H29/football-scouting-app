import { BadRequestError } from '../../../src/common/domain/errors/bad-request-error';
import { ConflictError } from '../../../src/common/domain/errors/conflict-error';
import { UpdateUserAction } from '../../../src/modules/user/application/actions/update-user.action';
import type { PasswordHasher } from '../../../src/modules/auth/application/services/interfaces/password-hasher.interface';
import type { UserRepository } from '../../../src/modules/user/domain/repositories/user.repository';

describe('UpdateUserAction', () => {
  it('updates a user and hashes the new password', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn().mockResolvedValue({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Leo',
        surname: 'Messi',
        email: 'leo.old@example.com',
        username: 'leo10',
        password: 'old-hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findByEmail: jest.fn().mockResolvedValue(null),
      findByUsername: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      updateById: jest.fn().mockResolvedValue({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Lionel',
        surname: 'Messi',
        email: 'leo.new@example.com',
        username: 'leo.messi10',
        password: 'hashed-password',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };

    const passwordHasher: PasswordHasher = {
      hash: jest.fn().mockResolvedValue('hashed-password'),
      compare: jest.fn(),
    };

    const action = new UpdateUserAction(userRepo, passwordHasher);
    const result = await action.execute('550e8400-e29b-41d4-a716-446655440000', {
      name: 'Lionel',
      surname: 'Messi',
      email: 'leo.new@example.com',
      username: 'leo.messi10',
      password: 'StrongPass1!',
      confirmPassword: 'StrongPass1!',
    });

    expect(passwordHasher.hash).toHaveBeenCalledWith('StrongPass1!');
    expect(userRepo.updateById).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440000',
      expect.objectContaining({
        email: 'leo.new@example.com',
        password: 'hashed-password',
      })
    );
    expect(result.email).toBe('leo.new@example.com');
  });

  it('throws when passwords do not match', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findByUsername: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
    };

    const passwordHasher: PasswordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    const action = new UpdateUserAction(userRepo, passwordHasher);

    await expect(
      action.execute('550e8400-e29b-41d4-a716-446655440000', {
        name: 'Lionel',
        surname: 'Messi',
        email: 'leo.new@example.com',
        username: 'leo.messi10',
        password: 'StrongPass1!',
        confirmPassword: 'DifferentPass1!',
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it('throws when email is already taken by another user', async () => {
    const userRepo: UserRepository = {
      findById: jest.fn().mockResolvedValue({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Leo',
        surname: 'Messi',
        email: 'leo.old@example.com',
        username: 'leo10',
        password: 'old-hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findByEmail: jest.fn().mockResolvedValue({
        id: '550e8400-e29b-41d4-a716-446655440999',
        name: 'Other',
        surname: 'User',
        email: 'leo.new@example.com',
        username: 'other.user',
        password: 'other-hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findByUsername: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      updateById: jest.fn(),
    };

    const passwordHasher: PasswordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    const action = new UpdateUserAction(userRepo, passwordHasher);

    await expect(
      action.execute('550e8400-e29b-41d4-a716-446655440000', {
        name: 'Lionel',
        surname: 'Messi',
        email: 'leo.new@example.com',
        username: 'leo.messi10',
        password: 'StrongPass1!',
        confirmPassword: 'StrongPass1!',
      })
    ).rejects.toBeInstanceOf(ConflictError);
  });
});

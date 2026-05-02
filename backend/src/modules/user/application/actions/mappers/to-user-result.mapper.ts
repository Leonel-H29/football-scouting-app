import type { User } from '../../../../user/domain/interfaces/user.interface';
import type { UserResult } from '../interfaces/user-result.interface';

export const toUserResult = (user: User): UserResult => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    username: user.username,
  };
};

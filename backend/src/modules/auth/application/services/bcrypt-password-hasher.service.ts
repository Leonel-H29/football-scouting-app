import bcrypt from 'bcrypt';
import { config } from '../../../../config/config';
import type { PasswordHasher } from '../services/interfaces/password-hasher.interface';

export class BcryptPasswordHasherService implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, config.bcryptSaltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

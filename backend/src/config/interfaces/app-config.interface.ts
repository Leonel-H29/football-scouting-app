import { Environment } from '../enum/environment.enum';
import type { SignOptions } from 'jsonwebtoken';

export interface AppConfig {
  readonly port: number;
  readonly databaseUrl: string;
  readonly nodeEnv: Environment;
  readonly jwtSecret: string;
  readonly jwtExpiresIn: SignOptions['expiresIn'];
  readonly bcryptSaltRounds: number;
}

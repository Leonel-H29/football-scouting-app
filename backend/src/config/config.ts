import { z } from 'zod';
import { Environment } from './enum/environment.enum';
import { AppConfig } from './interfaces/app-config.interface';
import type { SignOptions } from 'jsonwebtoken';

const configSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z.enum(Environment).default(Environment.DEVELOPMENT),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().min(2).default('1h'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(14).default(12),
});

const parsedConfig = configSchema.parse(process.env);

export const config: AppConfig = {
  port: parsedConfig.PORT,
  databaseUrl: parsedConfig.DATABASE_URL,
  nodeEnv: parsedConfig.NODE_ENV,
  jwtSecret: parsedConfig.JWT_SECRET,
  jwtExpiresIn: parsedConfig.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  bcryptSaltRounds: parsedConfig.BCRYPT_SALT_ROUNDS,
};

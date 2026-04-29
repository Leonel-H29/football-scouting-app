import { z } from 'zod';

const configSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
});

export interface AppConfig {
  readonly port: number;
  readonly databaseUrl: string;
  readonly nodeEnv: 'development' | 'test' | 'production';
}

const parsedConfig = configSchema.parse(process.env);

export const config: AppConfig = {
  port: parsedConfig.PORT,
  databaseUrl: parsedConfig.DATABASE_URL,
  nodeEnv: parsedConfig.NODE_ENV
};

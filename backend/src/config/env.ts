import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z
    .string({
      required_error: 'DATABASE_URL is missing',
    })
    .url('POSTGRES_URL format is invalid'),
  SESSION_SECRET: z
    .string({
      required_error: 'SESSION_SECRET is missing',
    })
    .min(32, 'SESSION_SECRET must at least 32 characters long')
    .default('SECREEEEEEEEEEEEEEEEEEEEEET'),
  PORT: z.coerce
    .number({
      required_error: 'PORT is missing',
    })
    .default(3000),
  POSTGRES_USER: z.string({
    required_error: 'POSTGRES_USER is missing',
  }),
  POSTGRES_PASSWORD: z.string({
    required_error: 'POSTGRES_PASSWORD is missing',
  }),
  POSTGRES_DB: z.string({
    required_error: 'POSTGRES_DB is missing',
  }),
});

const validated = envSchema.safeParse(process.env);

if (!validated.success) {
  const { fieldErrors } = validated.error.flatten();

  const errorMessages = Object.fromEntries(
    Object.entries(fieldErrors).map(([key, messages]) => [
      key,
      messages?.join(', '),
    ]),
  );

  console.log('Application configuration error', errorMessages);
  process.exit(1);
}

export const env = validated.data;

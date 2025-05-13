import Fastify from 'fastify';
import 'dotenv/config';
import fastifySensible from '@fastify/sensible';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { v1Routes } from './routes';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import fastifyRateLimit from '@fastify/rate-limit';

const port = Number(process.env.PORT) || 3000;

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};
const nodeEnv =
  (process.env.NODE_ENV as keyof typeof envToLogger) || 'development';
const fastify = Fastify({
  logger: envToLogger[nodeEnv] ?? true,
}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(fastifyRateLimit, {
  global: false,
});

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret:
    process.env.SESSION_SECRET ||
    'mon-super-secreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet',
  cookieName: 'DevTest_session',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'strict',
  },
});

fastify.register(fastifySensible);

fastify.register(v1Routes, { prefix: 'api/v1' });

const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: port });
    console.log(fastify.printRoutes());
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

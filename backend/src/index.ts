import Fastify, {
  type FastifyError,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
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
import { env } from '@config/env';

const envToLogger = {
  development: {
    // transport: {
    //   target: 'pino-pretty',
    //   options: {
    //     translateTime: 'HH:MM:ss Z',
    //     ignore: 'pid,hostname',
    //   },
    // },
  },
  production: true,
  test: false,
};
const nodeEnv = env.NODE_ENV as keyof typeof envToLogger;
const fastify = Fastify({
  logger: envToLogger[nodeEnv],
}).withTypeProvider<ZodTypeProvider>();

fastify
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .register(fastifyRateLimit, {
    global: false,
  })
  .register(fastifyCookie)
  .register(fastifySession, {
    secret: env.SESSION_SECRET,
    cookieName: 'DevTest_session',
    cookie: {
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'strict',
    },
  })
  .register(fastifySensible)
  .register(v1Routes, { prefix: 'api/v1' })
  .setErrorHandler(
    (err: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
      req.log.error(err);
      if (env.NODE_ENV === 'production') {
        return reply.internalServerError(
          'Something went wrong, please try again later',
        );
      }
      return reply.send(err);
    },
  );

const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: env.PORT });
    console.log(fastify.printRoutes());
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const closeServer = async (signal: string) => {
  fastify.log.info(`Received singal ${signal}, closing server...`);
  await fastify.close();
  process.exit(0);
};

process.on('SIGINT', () => closeServer('SIGINT'));
process.on('SIGTERM', () => closeServer('SIGTERM'));

start();

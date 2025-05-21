import Fastify, {
  type DoneFuncWithErrOrRes,
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
import fastifyCsrfProtection from '@fastify/csrf-protection';
import { csrfToken } from '@utils/csrfToken';

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
const fastifyApp = Fastify({
  logger: envToLogger[nodeEnv],
}).withTypeProvider<ZodTypeProvider>();

fastifyApp
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
      sameSite: 'none',
    },
  })
  .register(fastifyCsrfProtection, {
    getToken: (req: FastifyRequest) => {
      const token = req.headers['x-csrf-token'];
      return Array.isArray(token) ? token[0] : token || undefined;
    },
  })
  .register(fastifySensible)
  .register(csrfToken, { prefix: 'api/csrf-token' })
  .addHook(
    'onRequest',
    (req: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
      if (['POST', 'DELETE', 'PATCH', 'PUT'].includes(req.method)) {
        const token = req.headers['x-csrf-token'];
        if (!token) {
          return reply.forbidden('CSRF token is missing');
        }

        return fastifyApp.csrfProtection(req, reply, done);
      }
      done();
    },
  )
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

export default fastifyApp;

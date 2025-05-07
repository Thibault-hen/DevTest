import Fastify from 'fastify';
import 'dotenv/config';
import fastifySensible from '@fastify/sensible';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { v1Routes } from './routes';

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

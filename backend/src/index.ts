import { env } from '@config/env';
import fastifyApp from './app';

const start = async () => {
  try {
    await fastifyApp.listen({ host: '0.0.0.0', port: env.PORT });
    console.log(fastifyApp.printRoutes());
  } catch (err) {
    fastifyApp.log.error(err);
    process.exit(1);
  }
};

const closeServer = async (signal: string) => {
  fastifyApp.log.info(`Received singal ${signal}, closing server...`);
  await fastifyApp.close();
  process.exit(0);
};

process.on('SIGINT', () => closeServer('SIGINT'));
process.on('SIGTERM', () => closeServer('SIGTERM'));

start();

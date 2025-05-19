import '@fastify/session';
import type { env } from '../config/env';

declare module '@fastify/session' {
  interface FastifySessionObject {
    user: {
      id: string;
      email: string;
      role: string;
    };
  }
}

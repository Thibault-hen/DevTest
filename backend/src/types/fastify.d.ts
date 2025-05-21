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
  interface Session {
    userId?: string;
    id: string; // or whatever you're using
  }

  interface FastifyRequest {
    session: Session;
  }
}

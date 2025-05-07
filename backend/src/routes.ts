import type { FastifyInstance } from 'fastify';
import { authRoutes } from './modules/auth/auth.routes';

export const v1Routes = (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: 'auth' });
};

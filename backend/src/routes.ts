import type { FastifyInstance } from 'fastify';
import { authRoutes } from './modules/auth/auth.routes';
import { accountRoutes } from './modules/account/account.routes';

export const v1Routes = (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: 'auth' });
  app.register(accountRoutes, { prefix: 'account' });
};

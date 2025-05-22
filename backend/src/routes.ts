import { accountRoutes } from '@modules/account/account.routes';
import { authRoutes } from '@modules/auth/auth.routes';
import { difficultyRoutes } from '@modules/difficulty/difficulty.routes';
import { themeRoutes } from '@modules/theme/theme.routes';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

export const v1Routes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: 'auth' });
  app.register(accountRoutes, { prefix: 'account' });
  app.register(difficultyRoutes, { prefix: 'difficulties' });
  app.register(themeRoutes, { prefix: 'themes' });
};

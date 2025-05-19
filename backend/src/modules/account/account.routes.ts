import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { accountController } from './account.controller';
import { authMiddleware } from '../auth/auth.middleware';
import { updatePasswordSchema, updateUserSchema } from './account.schema';

export const accountRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.addHook('onRequest', authMiddleware.isAuthenticated);
  app.get('/me', accountController.me);
  app.put(
    '/password',
    {
      schema: {
        body: updatePasswordSchema,
      },
    },
    accountController.updatePassword,
  );
  app.put(
    '/',
    {
      schema: {
        body: updateUserSchema,
      },
    },
    accountController.updateInfo,
  );
  app.delete('/', accountController.deleteUser);
};

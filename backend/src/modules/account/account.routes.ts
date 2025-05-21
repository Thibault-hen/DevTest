import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { accountController } from './account.controller';
import { updatePasswordSchema, updateUserSchema } from './account.schema';
import { authMiddleware } from '@modules/auth/auth.middleware';

export const accountRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.addHook('onRequest', authMiddleware.isAuthenticated);
  app.get('/me', { handler: accountController.me });
  app.put('/password', {
    schema: {
      body: updatePasswordSchema,
    },
    handler: accountController.updatePassword,
  });
  app.put('/', {
    schema: {
      body: updateUserSchema,
    },
    handler: accountController.updateInfo,
  });
  app.delete('/', { handler: accountController.deleteUser });
};

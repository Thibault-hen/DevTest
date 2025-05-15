import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authController } from './auth.controller';
import { authMiddleware } from './auth.middleware';
import { signInUserSchema, signUpUserSchema } from './auth.schema';

export const authRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.post('/signup', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute',
      },
    },
    schema: {
      body: signUpUserSchema,
    },
    handler: authController.signup,
  });
  app.post('/signin', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute',
      },
    },
    schema: {
      body: signInUserSchema,
    },
    handler: authController.signin,
  });
  app.post('/logout', {
    preHandler: authMiddleware.isAuthenticated,
    handler: authController.logout,
  });
};

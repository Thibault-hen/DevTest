import type { FastifyInstance } from 'fastify';
import { signInUserSchema, signUpUserSchema } from './auth.schemas';
import { authController } from './auth.controller';
import { authMiddleware } from './auth.middleware';

export const authRoutes = (app: FastifyInstance) => {
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

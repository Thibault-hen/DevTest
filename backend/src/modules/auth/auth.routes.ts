import type { FastifyInstance } from 'fastify';
import { createUserSchema } from './auth.schemas';
import { authController } from './auth.controller';

export const authRoutes = (app: FastifyInstance) => {
  app.post('/', {
    schema: {
      body: createUserSchema,
    },
    handler: authController.signup,
  });
};

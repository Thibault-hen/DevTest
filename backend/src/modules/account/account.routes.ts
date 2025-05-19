import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware } from '../auth/auth.middleware';

export const accountRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {};

import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

import { difficultyController } from './difficulty.controller';
import { authMiddleware } from '@modules/auth/auth.middleware';
import { idParamsSchema } from '@utils/schema';
import {
  createDifficultySchema,
  updateDifficultySchema,
} from './difficulty.schema';

export const difficultyRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.get('/', difficultyController.getAllDifficulties);
  app.get('/:id', {
    schema: {
      params: idParamsSchema,
    },
    handler: difficultyController.getDifficultyById,
  });
  app.post('/', {
    preHandler: authMiddleware.isAdmin,
    schema: {
      body: createDifficultySchema,
    },
    handler: difficultyController.createDifficulty,
  });
  app.patch('/:id', {
    preHandler: authMiddleware.isAdmin,
    schema: {
      params: idParamsSchema,
      body: updateDifficultySchema,
    },
    handler: difficultyController.updateDifficulty,
  });
  app.delete('/:id', {
    preHandler: authMiddleware.isAdmin,
    schema: {
      params: idParamsSchema,
    },
    handler: difficultyController.deleteDifficulty,
  });
};

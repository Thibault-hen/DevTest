import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { themeController } from './theme.controller';
import { authMiddleware } from '@modules/auth/auth.middleware';
import { idParamsSchema } from '@utils/schema';
import { createThemeSchema, updateThemeSchema } from './theme.schema';

export const themeRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get('/', {
    handler: themeController.getAllThemes,
  });
  app.get('/:id', {
    schema: {
      params: idParamsSchema,
    },
    handler: themeController.getThemeById,
  });
  app.post('/', {
    preHandler: authMiddleware.isAdmin,
    schema: {
      body: createThemeSchema,
    },
    handler: themeController.createTheme,
  });
  app.patch('/:id', {
    preHandler: authMiddleware.isAdmin,
    schema: {
      params: idParamsSchema,
      body: updateThemeSchema,
    },
    handler: themeController.updateTheme,
  });
  app.delete('/:id', {
    preHandler: authMiddleware.isAdmin,
    schema: {
      params: idParamsSchema,
    },
    handler: themeController.deleteTheme,
  });
};

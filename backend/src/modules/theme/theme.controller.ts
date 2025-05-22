import type { FastifyReply, FastifyRequest } from 'fastify';
import { themeService } from './theme.service';
import type { IdParamsType } from '@utils/schema';
import type { createThemeType, updateThemeType } from './theme.schema';

export const themeController = {
  async getAllThemes(req: FastifyRequest, reply: FastifyReply) {
    const themes = await themeService.getAllThemes();

    if (!themes) {
      return reply.notFound('Could not found any themes');
    }

    return reply.status(200).send({
      data: themes,
    });
  },

  async getThemeById(
    req: FastifyRequest<{ Params: IdParamsType }>,
    reply: FastifyReply,
  ) {
    const foundTheme = await themeService.getThemeById(req.params.id);

    if (!foundTheme) {
      return reply.notFound('The theme with the provided ID does not exist');
    }

    return reply.status(200).send({
      data: foundTheme,
    });
  },

  async createTheme(
    req: FastifyRequest<{ Body: createThemeType }>,
    reply: FastifyReply,
  ) {
    const foundTheme = await themeService.getThemeByName(req.body.title);

    if (foundTheme) {
      return reply.conflict('This theme already exist');
    }

    const createdTheme = await themeService.createTheme(req.body);

    return reply.status(201).send({
      status: 'success',
      data: createdTheme,
    });
  },

  async updateTheme(
    req: FastifyRequest<{ Body: updateThemeType; Params: IdParamsType }>,
    reply: FastifyReply,
  ) {
    const foundTheme = await themeService.getThemeById(req.params.id);

    if (!foundTheme) {
      return reply.notFound('The theme with the provided ID does not exist');
    }

    const foundThemeByName = await themeService.getThemeByName(req.body.title);

    if (foundThemeByName) {
      return reply.conflict('This theme already exist');
    }

    const updatedTheme = await themeService.updateTheme(
      req.params.id,
      req.body,
    );

    return reply.status(200).send({
      status: 'success',
      data: updatedTheme,
    });
  },

  async deleteTheme(
    req: FastifyRequest<{ Params: IdParamsType }>,
    reply: FastifyReply,
  ) {
    const foundTheme = await themeService.getThemeById(req.params.id);

    if (!foundTheme) {
      return reply.notFound('The theme with the provided ID does not exist');
    }

    await themeService.deleteTheme(req.params.id);

    return reply.status(200).send({
      status: 'success',
      message: 'The theme has been deleted',
    });
  },
};

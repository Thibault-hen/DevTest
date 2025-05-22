import type { FastifyReply, FastifyRequest } from 'fastify';
import { difficultyService } from './difficulty.service';
import type { IdParamsType } from '@utils/schema';
import type {
  CreateDifficultyType,
  UpdateDifficultyType,
} from './difficulty.schema';

export const difficultyController = {
  async getAllDifficulties(req: FastifyRequest, reply: FastifyReply) {
    const difficulties = await difficultyService.getAllDifficulties();

    if (!difficulties) {
      return reply.notFound('Could not found any difficulties');
    }

    return reply.status(200).send({
      data: difficulties,
    });
  },

  async getDifficultyById(
    req: FastifyRequest<{ Params: IdParamsType }>,
    reply: FastifyReply,
  ) {
    const foundDifficulty = await difficultyService.getDifficultyById(
      req.params.id,
    );

    if (!foundDifficulty) {
      return reply.notFound(
        'The difficulty with the provided ID does not exist',
      );
    }

    return reply.status(200).send({
      data: foundDifficulty,
    });
  },

  async createDifficulty(
    req: FastifyRequest<{ Body: CreateDifficultyType }>,
    reply: FastifyReply,
  ) {
    const foundDifficulty = await difficultyService.getDifficultyByName(
      req.body.name,
    );

    if (foundDifficulty) {
      return reply.conflict('This difficulty already exist');
    }

    const createdDifficulty = await difficultyService.createDifficulty(
      req.body,
    );

    return reply.code(201).send({
      status: 'success',
      data: createdDifficulty,
    });
  },

  async updateDifficulty(
    req: FastifyRequest<{ Body: UpdateDifficultyType; Params: IdParamsType }>,
    reply: FastifyReply,
  ) {
    const foundDifficulty = await difficultyService.getDifficultyById(
      req.params.id,
    );

    if (!foundDifficulty) {
      return reply.notFound(
        'The difficulty with the provided ID does not exist',
      );
    }

    const foundDifficultyByName = await difficultyService.getDifficultyByName(
      req.body.name,
    );

    if (foundDifficultyByName) {
      return reply.conflict('This difficulty already exist');
    }

    const updatedDifficulty = await difficultyService.updateDifficulty(
      req.params.id,
      req.body,
    );

    return reply.status(200).send({
      status: 'success',
      data: updatedDifficulty,
    });
  },

  async deleteDifficulty(
    req: FastifyRequest<{ Params: IdParamsType }>,
    reply: FastifyReply,
  ) {
    const foundDifficulty = await difficultyService.getDifficultyById(
      req.params.id,
    );

    if (!foundDifficulty) {
      return reply.notFound(
        'This difficulty with the provided id do not exist',
      );
    }

    await difficultyService.deleteDifficulty(req.params.id);

    return reply.status(200).send({
      status: 'success',
      message: 'The difficulty has been deleted',
    });
  },
};

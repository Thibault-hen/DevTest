import type { Difficulty } from '@prisma/client';
import { prisma } from '@utils/prisma';
import type { IdParamType, NameParamType } from '@utils/schema';
import type {
  CreateDifficultyType,
  UpdateDifficultyType,
} from './difficulty.schema';

export const difficultyService = {
  async getAllDifficulties(): Promise<Difficulty[]> {
    return prisma.difficulty.findMany({});
  },

  async getDifficultyById(
    difficultyId: IdParamType,
  ): Promise<Difficulty | null> {
    return prisma.difficulty.findUnique({
      where: {
        id: difficultyId,
      },
    });
  },

  async getDifficultyByName(
    difficultyName: NameParamType,
  ): Promise<Difficulty | null> {
    return prisma.difficulty.findUnique({
      where: {
        name: difficultyName,
      },
    });
  },

  async createDifficulty(data: CreateDifficultyType): Promise<Difficulty> {
    return prisma.difficulty.create({
      data,
    });
  },

  async updateDifficulty(
    difficultyId: IdParamType,
    data: UpdateDifficultyType,
  ): Promise<Difficulty> {
    return prisma.difficulty.update({
      where: {
        id: difficultyId,
      },
      data,
    });
  },

  async deleteDifficulty(difficultyId: IdParamType) {
    await prisma.difficulty.delete({
      where: {
        id: difficultyId,
      },
    });
  },
};

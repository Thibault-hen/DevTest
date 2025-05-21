import type { Difficulty } from '@prisma/client';
import { prisma } from '@utils/prisma';
import type { IdParamType } from '@utils/schema';
import type {
  CreateDifficultyType,
  NameParamType,
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
    return prisma.difficulty.findFirst({
      where: {
        name: difficultyName,
      },
    });
  },

  async createDifficulty(data: CreateDifficultyType): Promise<Difficulty> {
    const createdDifficulty = await prisma.difficulty.create({
      data,
    });

    return createdDifficulty;
  },

  async updateDifficulty(
    difficultyId: IdParamType,
    data: UpdateDifficultyType,
  ): Promise<Difficulty> {
    const updatedDifficulty = await prisma.difficulty.update({
      where: {
        id: difficultyId,
      },
      data,
    });

    return updatedDifficulty;
  },

  async deleteDifficulty(difficultyId: IdParamType) {
    await prisma.difficulty.delete({
      where: {
        id: difficultyId,
      },
    });
  },
};

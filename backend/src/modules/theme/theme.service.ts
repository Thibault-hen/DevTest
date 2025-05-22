import type { Theme } from '@prisma/client';
import { prisma } from '@utils/prisma';
import type { IdParamType, NameParamType } from '@utils/schema';
import type { createThemeType, updateThemeType } from './theme.schema';

export const themeService = {
  async getAllThemes(): Promise<Theme[]> {
    return prisma.theme.findMany();
  },

  async getThemeById(themeId: IdParamType): Promise<Theme | null> {
    return prisma.theme.findUnique({
      where: {
        id: themeId,
      },
    });
  },

  async getThemeByName(themeName: NameParamType): Promise<Theme | null> {
    return prisma.theme.findUnique({
      where: {
        title: themeName,
      },
    });
  },

  async createTheme(data: createThemeType): Promise<Theme> {
    return prisma.theme.create({
      data,
    });
  },

  async updateTheme(
    themeId: IdParamType,
    data: updateThemeType,
  ): Promise<Theme> {
    return prisma.theme.update({ where: { id: themeId }, data });
  },

  async deleteTheme(themeId: IdParamType) {
    await prisma.theme.delete({
      where: {
        id: themeId,
      },
    });
  },
};

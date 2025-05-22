import { z } from 'zod';

export const createThemeSchema = z.object({
  title: z.string().max(30),
});

export const updateThemeSchema = z.object({
  title: z.string().max(30),
});

export type createThemeType = z.infer<typeof createThemeSchema>;
export type updateThemeType = z.infer<typeof updateThemeSchema>;

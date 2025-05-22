import { z } from 'zod';

export const createDifficultySchema = z.object({
  name: z.string().max(20),
});

export const updateDifficultySchema = z.object({
  name: z.string().max(20),
});

export type CreateDifficultyType = z.infer<typeof createDifficultySchema>;
export type UpdateDifficultyType = z.infer<typeof updateDifficultySchema>;

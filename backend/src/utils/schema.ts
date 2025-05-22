import { z } from 'zod';

export const idParamsSchema = z.object({
  id: z.string().cuid(),
});

export const nameParamsSchema = z.object({
  name: z.string(),
});

export type IdParamsType = z.infer<typeof idParamsSchema>;
export type NameParamsType = z.infer<typeof nameParamsSchema>;
export type IdParamType = z.infer<typeof idParamsSchema>['id'];
export type NameParamType = z.infer<typeof nameParamsSchema>['name'];

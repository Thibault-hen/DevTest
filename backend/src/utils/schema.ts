import { z } from 'zod';

export const idParamsSchema = z.object({
  id: z.string().cuid(),
});

export type IdParamsType = z.infer<typeof idParamsSchema>;
export type IdParamType = z.infer<typeof idParamsSchema>['id'];

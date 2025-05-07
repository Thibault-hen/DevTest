import { z } from 'zod';

export const createUserSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  specialization: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export type createUserType = z.infer<typeof createUserSchema>;

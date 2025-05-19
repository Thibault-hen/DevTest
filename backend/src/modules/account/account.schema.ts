import type { User } from '@prisma/client';
import { z } from 'zod';

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export const updateUserSchema = z.object({
  firstname: z.string().min(2).optional(),
  lastname: z.string().min(2).optional(),
  specialization: z.string().min(3).optional(),
});

export type UpdatedUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;

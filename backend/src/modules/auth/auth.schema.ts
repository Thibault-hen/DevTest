import type { User } from '@prisma/client';
import { z } from 'zod';

export const signUpUserSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  specialization: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type CreatedUser = Omit<User, 'password'>;
export type SignUpUserType = z.infer<typeof signUpUserSchema>;
export type SignInUserType = z.infer<typeof signInUserSchema>;

import type { User } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import type { CreatedUser, signUpUserType } from './auth.schema';
import argon2 from 'argon2';

export const authService = {
  async signup(data: signUpUserType): Promise<CreatedUser> {
    const hashedPassword = await argon2.hash(data.password, {
      type: argon2.argon2id,
    });

    const user: CreatedUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    return user;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user || null;
  },
};

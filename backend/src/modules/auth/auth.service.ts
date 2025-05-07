import type { User } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import type { createUserType } from './auth.schemas';
import argon2 from 'argon2';

export type CreatedUser = Omit<User, 'password'>;

export const authService = {
  async signup(data: createUserType): Promise<CreatedUser> {
    const hashedPassword = await argon2.hash(data.password, {
      type: argon2.argon2id,
    });

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  },

  async checkEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return !user;
  },
};

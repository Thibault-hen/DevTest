import type { User } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import type { signUpUserType } from './auth.schemas';
import argon2 from 'argon2';

export type CreatedUser = Omit<User, 'password'>;

export const authService = {
  async signup(data: signUpUserType): Promise<CreatedUser> {
    const hashedPassword = await argon2.hash(data.password, {
      type: argon2.argon2id,
    });
    prisma.user.createManyAndReturn;
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user || undefined;
  },
};

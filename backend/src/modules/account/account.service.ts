import type { User } from '@prisma/client';
import * as argon2 from 'argon2';
import type { UpdatedUser, UpdateUserType } from './account.schema';
import { prisma } from '@utils/prisma';

export const accountService = {
  async getUserById(userId: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  },

  async checkPassword(
    oldHashedpassword: string,
    oldPassword: string,
  ): Promise<boolean> {
    return argon2.verify(oldHashedpassword, oldPassword);
  },

  async checkPasswordDifference(
    oldHashedpassword: string,
    newPassword: string,
  ): Promise<boolean> {
    return !(await argon2.verify(oldHashedpassword, newPassword));
  },

  async updatePassword(userId: string, newPassword: string) {
    const hashedPassword = await argon2.hash(newPassword, {
      type: argon2.argon2id,
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
  },

  async updateUser(userId: string, data: UpdateUserType): Promise<UpdatedUser> {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  },

  async deleteUser(userId: string) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  },
};

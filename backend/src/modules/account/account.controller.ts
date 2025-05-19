import type { FastifyReply, FastifyRequest } from 'fastify';
import { accountService } from './account.service';
import type { UpdatePasswordType, UpdateUserType } from './account.schema';

export const accountController = {
  async me(req: FastifyRequest, reply: FastifyReply) {
    const user = req.session.user;

    const foundUser = await accountService.getUserById(user.id);

    return reply.code(200).send({
      data: {
        ...foundUser,
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
    });
  },

  async updatePassword(
    req: FastifyRequest<{ Body: UpdatePasswordType }>,
    reply: FastifyReply,
  ) {
    const user = req.session.user;
    const foundUser = await accountService.getUserById(user.id);

    const isPasswordMatching = await accountService.checkPassword(
      foundUser.password,
      req.body.oldPassword,
    );

    if (!isPasswordMatching) {
      return reply.badRequest('Bad credentials');
    }

    const isPasswordDifferent = await accountService.checkPasswordDifference(
      foundUser.password,
      req.body.newPassword,
    );

    if (!isPasswordDifferent) {
      return reply.badRequest('New password must be different');
    }

    await accountService.updatePassword(user.id, req.body.newPassword);

    return reply.code(200).send({
      status: 'success',
      message: 'Password updated',
    });
  },

  async updateInfo(
    req: FastifyRequest<{ Body: UpdateUserType }>,
    reply: FastifyReply,
  ) {
    const user = req.session.user;
    const updatedUser = await accountService.updateUser(user.id, req.body);

    return reply.code(200).send({
      status: 'success',
      data: updatedUser,
    });
  },

  async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    const user = req.session.user;

    req.session.destroy(async (err) => {
      if (err) {
        return reply.internalServerError('Failed delete this account');
      }
      await accountService.deleteUser(user.id);

      return reply.status(200).send({
        status: 'success',
        message: 'Account deleted',
      });
    });
  },
};

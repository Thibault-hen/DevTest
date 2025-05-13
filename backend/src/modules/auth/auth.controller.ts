import { authService } from './auth.service';
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { signUpUserType, signInUserType } from './auth.schemas';
import argon2 from 'argon2';

export const authController = {
  async signup(
    req: FastifyRequest<{ Body: signUpUserType }>,
    reply: FastifyReply,
  ) {
    const isEmailInUse = await authService.getUserByEmail(req.body.email);

    if (isEmailInUse) {
      return reply.badRequest('This email is already in use');
    }

    const user = await authService.signup(req.body);

    return reply.code(201).send({
      status: 'success',
      data: {
        ...user,
      },
    });
  },

  async signin(
    req: FastifyRequest<{ Body: signInUserType }>,
    reply: FastifyReply,
  ) {
    const user = await authService.getUserByEmail(req.body.email);

    if (!user) {
      return reply.badRequest('Bad credentials');
    }

    const isPasswordMatching = await argon2.verify(
      user.password,
      req.body.password,
    );

    if (!isPasswordMatching) {
      return reply.badRequest('Bad credentials');
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return reply.code(200).send({
      status: 'success',
      data: req.session.user,
    });
  },

  async logout(req: FastifyRequest, reply: FastifyReply) {
    req.session.destroy((err) => {
      if (err) {
        return reply.internalServerError('Failed to log out');
      }
      return reply.code(200).send({
        status: 'success',
        message: 'Logged out',
      });
    });
  },
};

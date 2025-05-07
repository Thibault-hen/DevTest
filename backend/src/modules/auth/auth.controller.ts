import { authService } from './auth.service';
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { createUserType } from './auth.schemas';

export const authController = {
  async signup(
    req: FastifyRequest<{ Body: createUserType }>,
    reply: FastifyReply,
  ) {
    const isEmailAvailable = await authService.checkEmail(req.body.email);

    if (!isEmailAvailable) {
      return reply.badRequest('This email is already in use');
    }

    const user = await authService.signup(req.body);
    return reply.code(201).send({ user });
  },
};

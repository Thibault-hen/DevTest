import type { FastifyReply, FastifyRequest } from 'fastify';

export const authMiddleware = {
  async isAuthenticated(req: FastifyRequest, reply: FastifyReply) {
    if (!req.session.user) {
      reply.unauthorized('You need to be logged in to perform this action');
      return;
    }
  },
  async isAdmin(req: FastifyRequest, reply: FastifyReply) {
    if (!req.session.user || req.session.user.role !== 'ADMIN') {
      reply.forbidden("You don't have the permission to perform this action");
      return;
    }
  },
};

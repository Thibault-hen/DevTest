import type {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export const csrfToken: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    const token = reply.generateCsrf();
    reply.status(200).send({ csrfToken: token });
  });
};

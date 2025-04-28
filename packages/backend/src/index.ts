import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import 'dotenv/config';
import fastifySensible from '@fastify/sensible';
import { PrismaClient } from '@prisma/client';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const port = Number(process.env.PORT) || 3000;

const fastify = Fastify({
	logger: true,
}).withTypeProvider<ZodTypeProvider>();

fastify.register(fastifySensible);

const start = async () => {
	try {
		await fastify.listen({ port: port, host: 'localhost' });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();

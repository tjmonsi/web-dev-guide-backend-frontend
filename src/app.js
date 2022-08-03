import Fastify from 'fastify';

export const build = async (opts = {}) => {
  const fastify = Fastify(opts);

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  });

  return fastify;
}
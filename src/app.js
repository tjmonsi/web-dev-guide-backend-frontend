import Fastify from 'fastify';
import { v4 } from 'uuid';
import { readFileSync, writeFileSync } from 'fs';

export const build = async (opts = {}) => {
  const fastify = Fastify(opts);

  const prefix = '/api';
  const filename = './db.json';

  fastify.post(`${prefix}/todo`, async (request, reply) => {
    const { body } = request;
    const { todo } = body;

    // read the "database"
    const db = JSON.parse(readFileSync(filename, 'utf8'));

    // create a new data entry
    const id = v4();
    db.todo[`${id}`] = {
      todo,
      createdDate: new Date().getTime()
    };

    // save to database
    writeFileSync(filename, JSON.stringify(db, null, 2), 'utf8');

    // return results
    /**
     * equal to:
     * const data = {
     *   id: id
     * }
     * 
     * // iterate the keys
     * for (const key in db.todo[`${id}`]) {
     *   data[`${key}`] = db.todo[`${id}`][`${key}`]
     * }
     */
    return {
      id,
      ...db.todo[`${id}`]
    }
  });

  return fastify;
}
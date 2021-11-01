import { Knex, knex } from 'knex';
import { env } from './env';

const knexfile = require('../knexfile');

let dbInstance: Knex;
export function db(): Knex {
  if (!dbInstance) {
    if (env.NODE_ENV === 'test') {
      dbInstance = knex(knexfile.test);
    } else {
      dbInstance = knex(knexfile.production);
    }
  }

  return dbInstance;
}

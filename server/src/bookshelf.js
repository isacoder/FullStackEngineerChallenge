import knex from 'knex';
import bookshelf from 'bookshelf';
import knexfile from '../knexfile';

const client = bookshelf(knex(knexfile));
export default client;

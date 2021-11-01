import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.binary('id', 16).primary().notNullable();
    table.string('username', 100).notNullable().unique();
    table.string('password', 100).notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}


import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', table => {
    table.binary('id', 16).primary().notNullable();
    table.binary('user_id', 16).notNullable();
    table.string('title', 50).notNullable();
    table.string('description', 100).notNullable();
    table.enum('status', ['TODO', 'IN_PROGRESS', 'DONE', 'ARCHIVED']).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('tasks');
}


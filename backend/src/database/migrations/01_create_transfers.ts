import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('bookings'))) {
    await knex.schema.createTable('bookings', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('phone').notNullable();
      table.string('serviceType').notNullable();
      table.string('origin').nullable();
      table.string('destination').nullable();
      table.string('date').notNullable(); // iso string
      table.decimal('price', 10, 2).notNullable();
      table.string('status').defaultTo('pending');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.string('notes').nullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('bookings');
}

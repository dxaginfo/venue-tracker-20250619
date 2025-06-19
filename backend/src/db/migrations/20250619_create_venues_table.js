/**
 * Migration: Create venues table
 */
exports.up = function(knex) {
  return knex.schema.createTable('venues', function(table) {
    table.uuid('venue_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('address');
    table.string('city');
    table.string('state');
    table.string('country');
    table.string('zip_code');
    table.integer('capacity');
    table.string('website');
    table.string('phone');
    table.string('email');
    table.text('description');
    table.jsonb('amenities');
    table.text('load_in_info');
    table.text('parking_info');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('venues');
};
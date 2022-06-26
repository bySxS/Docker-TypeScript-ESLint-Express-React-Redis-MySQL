/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('movies', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.string('title', 255).notNullable()
      tbl.index(['title'], 'idx_movies_title')
      tbl.integer('category_id')
        .references('id')
        .inTable('category_movies')
        .unsigned()
      tbl.integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned()
      tbl.string('text', 3000)
      tbl.string('url', 255)
      tbl.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('movies')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('category_news', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      // tbl.string('module_name', 40)
      //     .notNullable()
      tbl.string('name', 40)
        .notNullable()
      tbl.string('name_rus', 40)
        .notNullable()
      tbl.string('url', 80)
        .notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('category_news')
}

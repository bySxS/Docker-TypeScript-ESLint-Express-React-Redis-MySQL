/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.string('nickname', 40)
        .notNullable()
        .unique()
      tbl.index('nickname', 'idx_users_nickname')
      tbl.string('full_name', 80)
      tbl.integer('roles_id')
        .references('id')
        .inTable('roles')
        .unsigned()
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      tbl.string('email', 40)
        .notNullable()
        .unique()
      tbl.string('password', 200)
        .notNullable()
      tbl.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('users')
}

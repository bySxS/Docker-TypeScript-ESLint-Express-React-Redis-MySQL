import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_movies').del()
  await knex('category_movies').insert([
    { name: 'fantasy', name_rus: 'Фантастика', url: 'fantasy' }
  ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import { Knex } from "knex"

exports.seed = async function(knex: Knex) {
  // Deletes ALL existing entries
  //await knex('category_news').del()
  await knex('category_news').insert([
    {name: 'politics', name_rus: 'Политика', url: 'politics'},
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('users').del()
  await knex('users').insert([// pass 123456
    { nickname: 'Admin', full_name: 'administrator', roles_id: 1, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'sxs@gmail.com' },
    { nickname: 'Moder', full_name: 'вася', roles_id: 2, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'moder@gmail.com' },
    { nickname: 'Users', full_name: 'иван иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users@gmail.com' },
    { nickname: 'Users2', full_name: 'иван2 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users2@gmail.com' },
    { nickname: 'Users3', full_name: 'иван3 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users3@gmail.com' },
    { nickname: 'Users4', full_name: 'иван4 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users4@gmail.com' },
    { nickname: 'Users5', full_name: 'иван5 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users5@gmail.com' },
    { nickname: 'Users6', full_name: 'иван6 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users6@gmail.com' },
    { nickname: 'Users7', full_name: 'иван7 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users7@gmail.com' },
    { nickname: 'Users8', full_name: 'иван8 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users8@gmail.com' },
    { nickname: 'Users9', full_name: 'иван9 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users9@gmail.com' },
    { nickname: 'Users10', full_name: 'иван10 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users10@gmail.com' },
    { nickname: 'Users11', full_name: 'иван11 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users11@gmail.com' },
    { nickname: 'Users12', full_name: 'иван12 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users12@gmail.com' },
    { nickname: 'Users13', full_name: 'иван13 иванов', roles_id: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users13@gmail.com' }
  ])
}

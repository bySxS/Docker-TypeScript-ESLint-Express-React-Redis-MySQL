import { Model } from 'objection'
import { dbKnex } from '../db'

import { Roles } from '../roles/roles.model'
import { Comments } from '../comments/comments.model'
import { News } from '../news/news.model'
import { Movies } from '../movies/movies.model'
Model.knex(dbKnex)

/// ////////////users
export class Users extends Model {
  public id!: number
  public nickname!: string
  public full_name!: string
  public roles_id!: number
  public email!: string
  public password!: string
  public created_at!: Date | string
  public updated_at!: Date | string

  comments?: Comments[]
  news?: News[]
  movies?: Movies[]
  roles?: Roles[]

  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['nickname', 'full_name', 'roles_id', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        nickname: { type: 'string', minLength: 1, maxLength: 40 },
        full_name: { type: 'string', minLength: 1, maxLength: 80 },
        roles_id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 40 },
        password: { type: 'string', minLength: 1, maxLength: 200 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comments,
        join: {
          from: 'users.id',
          to: 'comments.user_id'
        }
      },
      news: {
        relation: Model.HasManyRelation,
        modelClass: News,
        join: {
          from: 'users.id',
          to: 'news.user_id'
        }
      },
      movies: {
        relation: Model.HasManyRelation,
        modelClass: Movies,
        join: {
          from: 'users.id',
          to: 'movies.user_id'
        }
      },
      roles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Roles,
        join: {
          from: 'users.roles_id',
          to: 'roles.id'
        }
      }
    }
  }

  $beforeInsert () {
    this.created_at = new Date(Date.now())
  }

  $beforeUpdate () {
    this.updated_at = new Date(Date.now())
  }
}

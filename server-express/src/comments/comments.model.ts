import { Model } from 'objection'
import { dbKnex } from '../db'

import { Users } from '../users/users.model'
import { News } from '../news/news.model'
import { Movies } from '../movies/movies.model'

Model.knex(dbKnex)

export class Comments extends Model {
  public id!: number
  public news_id!: number
  public movies_id!: number
  public user_id!: number
  public module_name!: string
  public text!: string
  public created_at!: Date | string
  public updated_at!: Date | string

  user?: Users
  news?: News[]
  movies?: Movies[]

  static get tableName () {
    return 'comments'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['module_name', 'news_id', 'movies_id', 'user_id', 'text'],

      properties: {
        id: { type: 'integer' },
        news_id: { type: 'integer' },
        movies_id: { type: 'integer' },
        user_id: { type: 'integer' },
        module_name: { type: 'string', minLength: 1, maxLength: 40 },
        text: { type: 'string', minLength: 1, maxLength: 1000 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'comments.user_id',
          to: 'users.id'
        }
      },
      news: {
        relation: Model.BelongsToOneRelation,
        modelClass: News,
        join: {
          from: 'comments.news_id',
          to: 'news.id'
        }
      },
      movies: {
        relation: Model.BelongsToOneRelation,
        modelClass: Movies,
        join: {
          from: 'comments.movies_id',
          to: 'movies.id'
        }
      },
      module_news: {
        relation: Model.HasManyRelation,
        modelClass: News,
        join: {
          from: 'comments.module_name',
          to: News.tableName
        }
      },
      module_movies: {
        relation: Model.HasManyRelation,
        modelClass: Movies,
        join: {
          from: 'comments.module_name',
          to: Movies.tableName
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

import {Model} from 'objection/typings/objection'
import {dbKnex} from '../db'

Model.knex(dbKnex)

import {News} from '../news/news.model'
import {Movies} from "../movies/movies.model";

//////CategoryNewsModel
export class CategoryNews extends Model {
    public id!: number
    public name!: string
    public name_rus!: string
    public url!: string

    news?: News[]

    static get tableName() {
        return 'category_news';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'name_rus', 'url'],

            properties: {
                id: {type: 'integer'},
                name: {type: 'string', minLength: 1, maxLength: 40},
                name_rus: {type: 'string', minLength: 1, maxLength: 40},
                url: {type: 'string', minLength: 0, maxLength: 80},
            }
        }
    }

    static get relationMappings() {
        return {
            news: {
                relation: Model.BelongsToOneRelation,
                modelClass: News,
                join: {
                    from: 'category_news.id',
                    to: 'news.category_id'
                }
            }
        }
    }
}


////CategoryMoviesModel
export class CategoryMovies extends Model {

    public id!: number
    public name!: string
    public name_rus!: string
    public url!: string

    movies?: Movies[]

    static get tableName() {
        return 'category_movies';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'name_rus', 'url'],

            properties: {
                id: {type: 'integer'},
                name: {type: 'string', minLength: 1, maxLength: 40},
                name_rus: {type: 'string', minLength: 1, maxLength: 40},
                url: {type: 'string', minLength: 0, maxLength: 80},
            }
        }
    }


    static get relationMappings() {
        return {
            movies: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movies,
                join: {
                    from: 'category_movies.id',
                    to: 'movies.category_id'
                }
            }
        }
    }
}

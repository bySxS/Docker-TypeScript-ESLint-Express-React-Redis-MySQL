import { Model }  from 'objection/typings/objection'
import { dbKnex } from '../db'
Model.knex(dbKnex)

//MoviesModel
class MoviesModel extends Model {


    static get tableName() {
        return 'movies';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['category_id', 'user_id', 'title', 'url', 'text'],

            properties: {
                id: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                url: { type: 'string', minLength: 0, maxLength: 255 },
                category_id: { type: 'integer' },
                user_id: { type: 'integer' },
                text: { type: 'string', minLength: 1, maxLength: 3000 },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        }
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'movies.user_id',
                    to: 'users.id'
                }
            },
            category: {
                relation: Model.HasManyRelation,
                modelClass: Category_movies,
                join: {
                    from: 'movies.category_id',
                    to: 'category_movies.id'
                }
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comments,
                join: {
                    from: this.tableName,
                    to: 'comments.module_name'
                }
            }
        }
    }

    $beforeInsert() {
        this.created_at = new Date(Date.now())
    }

    $beforeUpdate() {
        this.updated_at = new Date(Date.now())
    }
}
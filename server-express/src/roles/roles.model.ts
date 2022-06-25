import { Model }  from 'objection/typings/objection'
import { dbKnex } from '../db'
Model.knex(dbKnex)

import { Users } from '../users/users.model';

/////////roles
export class Roles extends Model {
    public id!: number
    public name!: string
    public name_rus!: string

    users?: Users[]


    static get tableName() {
        return 'roles';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'name_rus'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 40 },
                name_rus: { type: 'string', minLength: 1, maxLength: 40 },
            }
        }
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'roles.id',
                    to: 'users.roles_id'
                }
            }
        }
    }
}
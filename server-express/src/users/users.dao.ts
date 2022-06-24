import { hashSync } from 'bcryptjs'
import Logger, { IError } from '../logger';
import { Users } from './users.model'
import {IUsers} from "./users.service";

export interface IMessage {
    message: string
}

export class UsersDAO {

    static async registration(nickname: string,
                              fullName: string | undefined,
                              email: string,
                              password: string,
                              roles_id: number = 3): Promise<Promise<IMessage> | undefined> {

        try {


            const candidate = await Users.query()
                .findOne('nickname', nickname)
                .select('nickname')
            if (candidate) {
                return {message: "Пользователь с таким именем уже существует"}
            }
            const hashPassword = hashSync(password, 7);

            if (roles_id > 0) {
                await Users.query().insert({
                    nickname,
                    email,
                    full_name: fullName,
                    roles_id,
                    password: hashPassword
                })
                return {message: `Пользователь ${nickname} успешно зарегистрирован`}
            } else return {message: "Группы ${roles_id} - нет"}

        } catch (error) {
            const err = error as IError
            Logger.error(`${err.message}`, {users_dao: 'registration'})
        }

    }

    static getUserByNickname(nickname: string) {
        return Users.query().findOne('nickname', nickname)
    }


}




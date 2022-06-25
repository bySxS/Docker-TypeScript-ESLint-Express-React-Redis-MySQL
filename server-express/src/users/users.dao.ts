import {hashSync} from 'bcryptjs'
import Logger, {IError} from '../logger';
import {Users} from './users.model'
import {IMessage} from "../interface";
import {IUserDao} from "./users.interface";


class UsersDAO implements IUserDao {
    private static instance: UsersDAO;

    static getInstance(): UsersDAO {
        if (!UsersDAO.instance) {
            UsersDAO.instance = new UsersDAO();
        }
        return UsersDAO.instance;
    }

    async registration(nickname: string,
                              fullName: string | undefined,
                              email: string,
                              password: string,
                              roles_id: number = 3): Promise<IMessage> {

        try {


            const candidate = await Users.query()
                .findOne('nickname', nickname)
                .select('nickname')
            if (candidate) return {
                message: "Пользователь с таким именем уже существует"
            }

            const hashPassword = hashSync(password, 7);

            if (roles_id === 0) return {
                message: `Группы ${roles_id} - нет`
            }

            const result = await Users.query().insert({
                nickname,
                email,
                full_name: fullName,
                roles_id,
                password: hashPassword
            })
            return {
                result: result,
                message: `Пользователь ${nickname} успешно зарегистрирован`
            }


        } catch (error) {
            const err = error as IError
            Logger.error(`${err.message}`, {users_dao: 'registration'})
            return {
                message: `Ошибка регистрации`
            }
        }

    }

    async getUserByNickname(nickname: string): Promise<IMessage> {
        try {

            const result = await Users.query().findOne('nickname', nickname)
            return {
                result: result,
                message: 'Пользователь получен'
            }
        } catch (e) {
            return {message: 'Нет такого пользователя'}
        }

    }

    getUsers(limit: number, page: number): Promise<IMessage> {
        //return Promise.resolve(undefined);
    }


}


export default UsersDAO.getInstance();



import {hashSync} from 'bcryptjs'
import Logger, {IError} from '../logger';
import {Users} from './users.model'
import {IMessage} from "../interface";
import {IUserDao, IUsers} from "./users.interface";


class UsersDAO implements IUserDao {
    private static instance: UsersDAO;

    static getInstance(): UsersDAO { //паттерн singleton одиночка
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

    async getUsers(limit: number, page: number): Promise<IMessage> {
        try {
            const result = await Users.query().limit(limit).offset(page)
            return {result: result, message: `Страница ${page} пользователей успешно загружена`}
        } catch (e) {
            return {message: `Пользователей не загружены`}
        }

    }

    async deleteUserById(id: number): Promise<IMessage> {
       try {
           const result = await Users.query().deleteById(id)
           return {result: result, message: `Пользователь с ID ${id} удалён!`}
       } catch (e) {
           return {message: `Пользователь с ID ${id} не был удалён, произошла ошибка`}
       }
    }

    async getUserById(id: number): Promise<IMessage> {
        try {
            const user = await Users.query().findById(id)
            if (user) {
                return {result: user, message: `Пользователь с ID ${id} загружен!`}
            } else {
                return {message: `Пользователя с ID ${id} не найдено!`}
            }
        } catch (e) {
            return {message: `Пользователь с ID ${id} не был удалён, произошла ошибка`}
        }
    }

    async updateUserById(id: number, nickname: string, full_name: string = '', email: string, password: string, roles_id: number = 3): Promise<IMessage> {
        try {
        const findUser = await this.getUserById(id)
        if (!findUser.result) {
            return {message: `Пользователя с ID ${id} не найдено!`}
        }
            const changeUser = await Users.query()
                .where('id', '=', id)
                .update({
                    nickname,
                    email,
                    full_name,
                    password,
                    roles_id
                })
            return {result: changeUser, message: `Данные пользователя с ID ${id} изменены`}

        } catch (e) {
            return {message: `Ошибка изменения данные пользователя с ID ${id}`}
        }
    }

    async searchUsers(nickname: string, limit: number, page: number): Promise<IMessage> {

        try {

            const users = await Users.query().limit(limit).offset(page)
                .where('nickname', 'like',`%${nickname}%`)
            return {result: users, message: `Поиск прошёл успешно`}

        } catch (e) {
            return { message: 'Поиск прошёл не успешно' }
        }

    }




}


export default UsersDAO.getInstance();



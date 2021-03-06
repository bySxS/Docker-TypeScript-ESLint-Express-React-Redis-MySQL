import { hashSync } from 'bcryptjs'
import { Users } from './users.model'
import { IError, IMessage } from '../interface'
import { IUserDao } from './users.interface'
import { cacheRedisDB } from '../cache'
import { userQueueDB } from '../queue'
import milliseconds from 'milliseconds'

class UsersDAO implements IUserDao {
  // eslint-disable-next-line no-use-before-define
  private static instance: UsersDAO

  static getInstance (): UsersDAO { // паттерн singleton одиночка
    if (!UsersDAO.instance) {
      UsersDAO.instance = new UsersDAO()
    }
    return UsersDAO.instance
  }

  async registration (nickname: string,
    fullName: string | undefined,
    email: string,
    password: string,
    rolesId: number = 3): Promise<IMessage> {
    try {
      const candidate = await Users.query()
        .findOne('nickname', nickname)
        .select('nickname')
      if (candidate) {
        return {
          success: false,
          message: 'Пользователь с таким именем уже существует'
        }
      }

      const hashPassword = hashSync(password, 7)

      if (rolesId === 0) {
        return {
          success: false,
          message: `Группы ${rolesId} - нет`
        }
      }

      const result = await Users.query().insert({
        nickname,
        email,
        full_name: fullName,
        roles_id: rolesId,
        password: hashPassword
      })
      return {
        success: true,
        result,
        message: `Пользователь ${nickname} успешно зарегистрирован`
      }
    } catch (error) {
      const err = error as IError
      return {
        success: false,
        message: 'Ошибка регистрации ' + err.message
      }
    }
  }

  async getUserByNickname (nickname: string): Promise<IMessage> {
    try {
      const result = await Users.query().findOne('nickname', nickname)
      return {
        success: true,
        result,
        message: 'Пользователь получен'
      }
    } catch (e) {
      const err = e as IError
      return {
        success: false,
        message: 'Нет такого пользователя ' + err.message
      }
    }
  }

  async getUsers (limit: number = 10, page: number = 1): Promise<IMessage> {
    try {
      const result = await Users.query().limit(limit).offset(page)
      return {
        success: true,
        result,
        message: `Страница ${page} пользователей успешно загружена`
      }
    } catch (e) {
      const err = e as IError
      return {
        success: false,
        message: 'Пользователей не загружены ' + err.message
      }
    }
  }

  async deleteUserById (id: number): Promise<IMessage> {
    try {
      const PayLoad = { id }
      await userQueueDB.add('deleteUser', PayLoad, {
        delay: milliseconds.seconds(15)
      })
      // const result = await Users.query().deleteById(id)
      return {
        success: true,
        message: `Пользователь с ID ${id} будет удалён через минуту!`
      }
    } catch (e) {
      const err = e as IError
      return {
        success: false,
        message: `Пользователь с ID ${id} не был удалён, произошла ошибка ` + err.message
      }
    }
  }

  async getUserById (id: number): Promise<IMessage> {
    let user
    try {
      user = await cacheRedisDB.get('user:' + id)
      if (user) {
        user = JSON.parse(user)
      } else {
        user = await Users.query().findById(id)
        if (!user) {
          return {
            success: false,
            message: `Пользователя с ID ${id} не найдено!`
          }
        }
        await cacheRedisDB.set('user:' + id, JSON.stringify(user))
      }
      await cacheRedisDB.expire('user:' + id, 1800) // удалять через пол часа
      return {
        success: true,
        result: user,
        message: `Пользователь с ID ${id} загружен!`
      }
    } catch (e) {
      const err = e as IError
      return {
        success: false,
        message: `Пользователь с ID ${id} не был получен, произошла ошибка ` +
          err.message
      }
    }
  }

  async updateUserById (id: number, nickname: string, fullName: string = '', email: string, password: string, rolesId: number = 3): Promise<IMessage> {
    try {
      const findUser = await this.getUserById(id)
      if (!findUser.result) {
        return {
          success: false,
          message: `Пользователя с ID ${id} не найдено!`
        }
      }
      const changeUser = await Users.query()
        .where('id', '=', id)
        .update({
          nickname,
          email,
          full_name: fullName,
          password,
          roles_id: rolesId
        })
      return {
        success: true,
        result: changeUser,
        message: `Данные пользователя с ID ${id} изменены`
      }
    } catch (e) {
      const err = e as IError
      return {
        success: false,
        message: `Ошибка изменения данные пользователя с ID ${id}` +
          err.message
      }
    }
  }

  async searchUsers (nickname: string, limit: number, page: number): Promise<IMessage> {
    try {
      const users = await Users.query().limit(limit).offset(page)
        .where('nickname', 'like', `%${nickname}%`)
      return {
        success: true,
        result: users,
        message: 'Поиск прошёл успешно'
      }
    } catch (e) {
      const err = e as IError
      return {
        success: true,
        message: 'Поиск прошёл не успешно' + err.message
      }
    }
  }
}

export default UsersDAO.getInstance()

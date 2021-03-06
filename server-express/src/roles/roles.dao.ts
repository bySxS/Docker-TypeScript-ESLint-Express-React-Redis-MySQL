import { Roles } from './roles.model'
import { IRolesDao } from './roles.interface'
import { IMessage } from '../interface'

class RolesDao implements IRolesDao {
  // eslint-disable-next-line no-use-before-define
  private static instance: RolesDao

  static getInstance (): RolesDao { // паттерн singleton одиночка
    if (!RolesDao.instance) {
      RolesDao.instance = new RolesDao()
    }
    return RolesDao.instance
  }

  async AddRole (name: string, nameRus: string): Promise<IMessage> {
    try {
      const result = await Roles.query().insert({
        name,
        name_rus: nameRus
      })

      return {
        success: true,
        result,
        message: `Группа пользователей ${nameRus} успешно добавлена!`
      }
    } catch (e) {
      return {
        success: true,
        message: 'Произошла ошибка при добавлении Группы пользователей!'
      }
    }
  }

  async getRoleById (id: number): Promise<IMessage> {
    try {
      const result = await Roles.query().findById(id)
      return {
        success: true,
        result,
        message: `Группа по ID ${id} получена`
      }
    } catch (e) {
      return {
        success: false,
        message: 'Произошла ошибка получения группы по ID'
      }
    }
  }

  async getRoles () {
    try {
      const result = await Roles.query()

      return {
        success: true,
        result,
        message: 'Все Группы полученны'
      }
    } catch (e) {
      return {
        success: true,
        message: 'Произошла ошибка получения груп'
      }
    }
  }
}

export default RolesDao.getInstance()

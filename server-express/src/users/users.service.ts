import UsersDAO from './users.dao'

import { IUsers, IUserService } from './users.interface'
import { IMessage } from '../interface'

class UsersService implements IUserService {
  // eslint-disable-next-line no-use-before-define
  private static instance: UsersService

  static getInstance (): UsersService { // singleton
    if (!UsersService.instance) {
      UsersService.instance = new UsersService()
    }
    return UsersService.instance
  }

  registration (Dto: IUsers): Promise<IMessage> {
    const { nickname, fullName, email, password } = Dto
    return UsersDAO.registration(nickname, fullName, email, password)
  }

  getUserByNickname (Dto: IUsers): Promise<IMessage> {
    const { nickname } = Dto
    return UsersDAO.getUserByNickname(nickname)
  }

  getUsers (limit: number, page: number): Promise<IMessage> {
    return UsersDAO.getUsers(limit, page)
  }

  deleteUserById (Dto: IUsers): Promise<IMessage> {
    const { id } = Dto
    return UsersDAO.deleteUserById(id)
  }

  updateUserById (id: number, bodyDto: IUsers, rolesIdAuthUser: number): Promise<IMessage> {
    const { nickname, fullName, email, password } = bodyDto
    let rolesId
    if (rolesIdAuthUser === 1) { // если авторизированный админ то можно позволить сменить группу
      ({ rolesId } = bodyDto)
    }
    return UsersDAO.updateUserById(id, nickname, fullName, email, password, rolesId)
  }

  getUserById (id: number): Promise<IMessage> {
    return UsersDAO.getUserById(id)
  }

  searchUsers (nickname: string, limit: number, page: number): Promise<IMessage> {
    return UsersDAO.searchUsers(nickname, limit, page)
  }
}

export default UsersService.getInstance()

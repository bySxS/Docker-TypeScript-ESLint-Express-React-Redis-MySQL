import UsersDAO from './users.dao'

import {IUsers, IUserService} from "./users.interface";
import {IMessage} from "../interface";


class UsersService implements IUserService {
    private static instance: UsersService;

    static getInstance(): UsersService { //singleton
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    registration(Dto: IUsers): Promise<IMessage> {
        const {nickname, full_name, email, password} = Dto
        return UsersDAO.registration(nickname, full_name, email, password)
    }

    getUserByNickname(Dto: IUsers): Promise<IMessage> {
        const {nickname} = Dto
        return UsersDAO.getUserByNickname(nickname)
    }

    getUsers(limit: number, page: number): Promise<IMessage> {
        return UsersDAO.getUsers(limit, page)
    }

    deleteUserById(Dto: IUsers): Promise<IMessage> {
        const {id} = Dto
        return UsersDAO.deleteUserById(id)
    }

    updateUserById(id: number, bodyDto: IUsers, rolesIdAuthUser: number): Promise<IMessage> {
        const {nickname, full_name, email, password} = bodyDto
        let roles_id
        if (rolesIdAuthUser === 1) {//если авторизированный админ то можно позволить сменить группу
            ({roles_id} = bodyDto)
        }
        return UsersDAO.updateUserById(id, nickname, full_name, email, password, roles_id)
    }

    getUserById(id: number): Promise<IMessage> {
        return UsersDAO.getUserById(id)
    }

    searchUsers(nickname: string, limit: number, page: number): Promise<IMessage> {
        return UsersDAO.searchUsers(nickname, limit, page)
    }


}

export default UsersService.getInstance();
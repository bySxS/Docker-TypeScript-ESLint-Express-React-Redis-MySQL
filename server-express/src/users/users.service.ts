import UsersDAO from './users.dao'

import { IUsers, IUserService } from "./users.interface";
import { IMessage } from "../interface";


class UsersService implements IUserService {
    private static instance: UsersService;

    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    //////////////////////////////////
    registration(Dto: IUsers): Promise<IMessage> {
        const { nickname, full_name, email, password } = Dto
        return UsersDAO.registration(nickname, full_name, email, password)
    }

    //////////////////////////////////
    getUserByNickname(Dto: IUsers): Promise<IMessage> {
        const { nickname } = Dto
        return UsersDAO.getUserByNickname(nickname)
    }

    // static deleteUserById(Dto: IUsers): Promise<IMessage> {
    //    // return //Promise.resolve(undefined);
    // }

    getUsers(limit: number, page: number): Promise<IMessage> {
       // return //Promise.resolve(undefined);
    }

    // static patchUserById(Dto: IUsers): Promise<IMessage> {
    //   //  return //Promise.resolve(undefined);
    // }
    //
    //
    // static updateUserById(Dto: IUsers): Promise<IMessage> {
    //    // return //Promise.resolve(undefined);
    // }

    //////////////////////////////////



}

export default UsersService.getInstance();
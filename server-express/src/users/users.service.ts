import {IMessage, UsersDAO} from './users.dao'

export interface IUsers {
    id: number,
    nickname: string,
    full_name?: string,
    roles_id?: number,
    email: string,
    password: string
}

export class UsersService {

    //////////////////////////////////
    static registration(Dto: IUsers): Promise<Promise<IMessage> | undefined> {
        const { nickname, full_name, email, password } = Dto
        return UsersDAO.registration(nickname, full_name, email, password)
    }

    //////////////////////////////////
    static getUserByNickname(Dto: IUsers) {
        const { nickname } = Dto
        return UsersDAO.getUserByNickname(nickname)
    }

    //////////////////////////////////






}
import {IMessage} from "../interface";

export interface IUsers {
    id: number,
    nickname: string,
    full_name?: string,
    roles_id?: number,
    email: string,
    password: string
}

export interface IUserService {
    registration: (Dto: IUsers) => Promise<IMessage>,
    getUserByNickname: (Dto: IUsers) => Promise<IMessage>,
    getUsers: (limit: number, page: number) => Promise<IMessage>,
    // updateUserById: (Dto: IUsers) => Promise<IMessage>,
    // deleteUserById: (Dto: IUsers) => Promise<IMessage>,
    // patchUserById: (Dto: IUsers) => Promise<IMessage>,
}

export interface IUserDao {
    registration: (nickname: string,
                   fullName: string | undefined,
                   email: string,
                   password: string,
                   roles_id: number) => Promise<IMessage>,
    getUserByNickname: (nickname: string) => Promise<IMessage>,
    getUsers: (limit: number, page: number) => Promise<IMessage>,
    // updateUserById: (Dto: IUsers) => Promise<IMessage>,
    // deleteUserById: (Dto: IUsers) => Promise<IMessage>,
    // patchUserById: (Dto: IUsers) => Promise<IMessage>,
}
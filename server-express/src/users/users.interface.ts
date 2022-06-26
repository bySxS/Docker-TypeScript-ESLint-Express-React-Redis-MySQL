import { IMessage } from '../interface'

export interface IUsers {
    id: number,
    nickname: string,
    fullName?: string,
    rolesId?: number,
    email: string,
    password: string
}

export interface IJwt {
    roles_id: number
    roles: string,
    id: number,
    nickname: string
}

export interface IUserService {
    registration: (Dto: IUsers) => Promise<IMessage>,
    getUserByNickname: (Dto: IUsers) => Promise<IMessage>,
    getUserById: (id: number) => Promise<IMessage>,
    getUsers: (limit: number, page: number) => Promise<IMessage>,
    updateUserById: (id: number, bodyDto: IUsers, rolesIdAuthUser: number) => Promise<IMessage>,
    deleteUserById: (Dto: IUsers) => Promise<IMessage>,
    searchUsers: (nickname: string, limit: number, page: number) => Promise<IMessage>,
}

export interface IUserDao {
    registration: (nickname: string,
                   fullName: string | undefined,
                   email: string,
                   password: string,
                   rolesId: number) => Promise<IMessage>,
    getUserByNickname: (nickname: string) => Promise<IMessage>,
    getUserById: (id: number) => Promise<IMessage>,
    getUsers: (limit: number, page: number) => Promise<IMessage>,
    updateUserById: (id: number, nickname: string, fullName: string, email: string, password: string, rolesId: number) => Promise<IMessage>,
    deleteUserById: (id: number) => Promise<IMessage>,
    searchUsers: (nickname: string, limit: number, page: number) => Promise<IMessage>,
}
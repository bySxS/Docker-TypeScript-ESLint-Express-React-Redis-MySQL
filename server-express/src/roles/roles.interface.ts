import {IMessage} from "../interface";

export interface IRoles {
    id: number,
    roles_id?: number,
    name: string,
    name_rus: string,
}

export interface IRolesService {
    AddRole: (Dto: IRoles) => Promise<IMessage>,
    getRoleById: (Dto: IRoles) => Promise<IMessage>,
    getRoles: () => Promise<IMessage>,
}

export interface IRolesDao {
    AddRole: (name: string, nameRus: string) => Promise<IMessage>,
    getRoleById: (id: number) => Promise<IMessage>,
    getRoles: () => Promise<IMessage>,
}

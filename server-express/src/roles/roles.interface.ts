import { IMessage } from '../interface'

export interface IRoles {
    id: number,
    rolesId?: number,
    name: string,
    nameRus: string,
}

export interface IRolesService {
    AddRole: (Dto: IRoles) => Promise<IMessage>,
    getRoleById: (id: number) => Promise<IMessage>,
    getRoles: () => Promise<IMessage>,
}

export interface IRolesDao {
    AddRole: (name: string, nameRus: string) => Promise<IMessage>,
    getRoleById: (id: number) => Promise<IMessage>,
    getRoles: () => Promise<IMessage>,
}

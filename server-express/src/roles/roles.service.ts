import { RolesDao } from "./roles.dao";
import {Roles} from "./roles.model";

export interface IRoles {
    id: number,
    roles_id?: number,
    name: string,
    name_rus: string,
}

export class RolesService {

    static AddRole(Dto: IRoles){
        const {name, name_rus} = Dto
        return RolesDao.AddRole(name, name_rus)
    }

    static getRoleById(id: number){
        return RolesDao.getRoleById(id)
    }

    static getRoles() {
        return RolesDao.getRoles()
    }

}
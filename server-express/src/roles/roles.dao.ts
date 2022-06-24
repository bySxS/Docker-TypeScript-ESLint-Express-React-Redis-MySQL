import { Roles } from "./roles.model";

export class RolesDao {

    static AddRole(name: string, nameRus: string) {
        return Roles.query().insert({
            name,
            name_rus: nameRus
        })
    }

    static getRoleById(id: number){
        return Roles.query().findById(id)
    }

    static getRoles() {
        return Roles.query()
    }

}
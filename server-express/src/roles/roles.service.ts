import RolesDao from "./roles.dao";
import {IRoles, IRolesService} from "./roles.interface";
import {IMessage} from "../interface";



class RolesService implements IRolesService {
    private static instance: RolesService;

    static getInstance(): RolesService { //singleton
        if (!RolesService.instance) {
            RolesService.instance = new RolesService();
        }
        return RolesService.instance;
    }


    AddRole(Dto: IRoles): Promise<IMessage> {
        const {name, name_rus} = Dto
        return RolesDao.AddRole(name, name_rus)
    }

    getRoleById(Dto: IRoles): Promise<IMessage> {
        const { id } = Dto
        return RolesDao.getRoleById(id)
    }

    getRoles(): Promise<IMessage> {
        return RolesDao.getRoles()
    }

}

export default RolesService.getInstance();
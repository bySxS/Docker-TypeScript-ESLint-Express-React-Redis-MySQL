import RolesDao from './roles.dao'
import { IRoles, IRolesService } from './roles.interface'
import { IMessage } from '../interface'

class RolesService implements IRolesService {
  // eslint-disable-next-line no-use-before-define
  private static instance: RolesService

  static getInstance (): RolesService { // singleton
    if (!RolesService.instance) {
      RolesService.instance = new RolesService()
    }
    return RolesService.instance
  }

  AddRole (Dto: IRoles): Promise<IMessage> {
    const { name, nameRus } = Dto
    return RolesDao.AddRole(name, nameRus)
  }

  getRoleById (id: number): Promise<IMessage> {
    return RolesDao.getRoleById(id)
  }

  getRoles (): Promise<IMessage> {
    return RolesDao.getRoles()
  }
}

export default RolesService.getInstance()

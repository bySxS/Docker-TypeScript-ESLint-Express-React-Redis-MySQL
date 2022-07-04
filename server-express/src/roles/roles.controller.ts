import { NextFunction, Request, Response } from 'express'
import RolesService from './roles.service'

class RolesController {
  // eslint-disable-next-line no-use-before-define
  private static instance: RolesController

  static getInstance (): RolesController { // паттерн singleton одиночка
    if (!RolesController.instance) {
      RolesController.instance = new RolesController()
    }
    return RolesController.instance
  }

  async AddRole (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await RolesService.AddRole(req.body)
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default RolesController.getInstance()

import { Request, Response } from 'express'
import { RolesService } from "./roles.service";
import Logger from "../logger";

interface IError {
    message: string
}

export class RolesController {

    static async AddRole(req: Request, res: Response) {
        try {
            const result = await RolesService.AddRole(req.body)
            res.status(201).json(result)
        } catch (error) {
            const err = error as IError
            Logger.error(`${err.message}`, {roles_controller: 'AddRole'})
            res.status(500).json('что-то пошло не так!')
        }
    }

}
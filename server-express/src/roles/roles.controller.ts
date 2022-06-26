import { Request, Response } from 'express'
import RolesService from "./roles.service";
import Logger, {IError} from "../logger";

class RolesController {
    private static instance: RolesController;

    static getInstance(): RolesController { //паттерн singleton одиночка
        if (!RolesController.instance) {
            RolesController.instance = new RolesController();
        }
        return RolesController.instance;
    }


    async AddRole(req: Request, res: Response) {
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

export default RolesController.getInstance();
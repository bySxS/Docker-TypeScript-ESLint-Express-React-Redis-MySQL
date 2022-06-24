import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { IUsers, UsersService } from "./users.service"
import { Secret, sign } from 'jsonwebtoken'
import { compareSync } from 'bcryptjs'
import { RolesService } from "../roles/roles.service";

interface IJwt {
    roles: string,
    id: number,
    nickname: string
}

function generateAccessToken(id: number, nickname: string, roles: string): string | undefined {
    const payload: IJwt = {
        roles,
        id,
        nickname
    }

    const SECRET: Secret | undefined = process.env.JWT_ACCESS_SECRET
    if (SECRET) {
        return sign(payload, SECRET, {expiresIn: "24h"})
    }
}


export class UsersController {

    //////////////////////////////////////
    static async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400)
                    .json({message: "Ошибка при регистрации", errors})
            }
            const result = await UsersService.registration(req.body)
            res.status(201).json(result)
        } catch (err) {
            //logger.error(err, {controller_users: 'registration'})
            res.status(500).json('что-то пошло не так!')
        }
    }

    ////////////////////////////////////////
    static async login(req: Request, res: Response) {
        try {
            let password: string
            let nickname: string
            ({password, nickname} = req.body)
            const user = await UsersService.getUserByNickname(req.body)
             if (!user) {
                return res.status(400)
                    .json({message: `Пользователь ${nickname} не найден`})
            }
            const roles = await RolesService.getRoleById(user.roles_id)
            if (!roles) {
                return res.status(400)
                    .json({message: `Пользователь ${nickname} не имеет группы`})
            }
            const validPassword = compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400)
                    .json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user.id, user.nickname, roles.name)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    /////////////////////////////////////


}
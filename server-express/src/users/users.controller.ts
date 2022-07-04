import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import UsersService from './users.service'
import { Secret, sign } from 'jsonwebtoken'
import { compareSync } from 'bcryptjs'
import RolesService from '../roles/roles.service'
import { IJwt } from './users.interface'
import AppError from '../appError'

function generateAccessToken(id: number, nickname: string, roles: string, rolesId: number): string {
    const payload: IJwt = {
        roles_id: rolesId,
        roles,
        id,
        nickname
    }

    const SECRET: Secret = process.env.JWT_ACCESS_SECRET || ''
    if (SECRET !== '') {
        return sign(payload, SECRET, {expiresIn: "24h"})
    } else return ''
}


class UsersController {
    private static instance: UsersController

    static getInstance(): UsersController { //паттерн singleton одиночка
        if (!UsersController.instance) {
            UsersController.instance = new UsersController()
        }
        return UsersController.instance
    }

///////////////
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errorsValid = validationResult(req)
            if (!errorsValid.isEmpty()) {
                throw new AppError('Ошибка при регистрации. ' + errorsValid,
                  400,  'registration')
            }
            const result = await UsersService.registration(req.body)
            return res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }///////////////registration


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            let password: string
            let nickname: string
            ({password, nickname} = req.body)
            const user = await UsersService.getUserByNickname(req.body)
            if (!user.result) {
                throw new AppError(user.message, 400, 'login')
            }
            const roles = await RolesService.getRoleById(user.result.roles_id)
            if (!roles.result) {
                throw new AppError(roles.message, 400, 'login')
            }
            const validPassword = compareSync(password, user.result.password)
            if (!validPassword) {
                throw new AppError('Введен неверный пароль', 400, 'login')
            }
            const token = generateAccessToken(
                user.result.id,
                user.result.nickname,
                roles.result.name,
                user.result.roles_id)
            return res.json({token})
        } catch (err) {
          next(err)
        }
    } /////////////////login
    
    async updateUser(req: Request, res: Response, next: NextFunction) {
            try {
                if (!req.params.id) {
                    throw new AppError('Не указан Id пользователя', 400, 'updateUser')
                }
                const id = Number(req.params.id)
                const authUser = req.user as IJwt
                const result = await UsersService.updateUserById(id, req.body, authUser.roles_id)
                return res.status(201).json(result.message)
            } catch (err) {
                next(err)
            }
    }
    

    async getUsers(req: Request, res: Response, next: NextFunction) {

        try {
            const limit: number = Number(req.query.limit || 10)
            const offset: number = Number(req.query.offset || 1)
            const listUsers = await UsersService.getUsers(limit, offset)
            return res.status(200).json(listUsers)
        } catch (err) {
           next(err)
        }

    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id) {
                throw new AppError('Не указан Id пользователя', 400, 'getUserById')
            }
            const id = Number(req.params.id)
            const User = await UsersService.getUserById(id)
            return res.status(200).send(User)
        } catch (err) {
            next(err)
        }
    }
    
    async deleteUserById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id) {
                throw new AppError('Не указан Id пользователя', 400, 'deleteUserById')
            }
            const id = Number(req.params.id)
            const User = await UsersService.deleteUserById(id)
            return res.status(200).send(User)
        } catch (err) {
           next(err)
        }
    }

    async searchUsers(req: Request, res: Response, next: NextFunction) {

        try {
            //const start = new Date().getTime();
            const nickname: string = String(req.query.nickname || '')
            const limit: number = Number(req.query.limit || 1)
            const offset: number = Number(req.query.offset || 1)
            const listUsers = await UsersService.searchUsers(nickname, limit, offset)
            //const end = new Date().getTime();
            //logger.info(`время выполнения - ${end - start}ms`, {controller_users: 'searchUsers'})
            return res.status(200).send(listUsers)
        } catch (err) {
            next(err)
        }
    }


}

export default UsersController.getInstance()

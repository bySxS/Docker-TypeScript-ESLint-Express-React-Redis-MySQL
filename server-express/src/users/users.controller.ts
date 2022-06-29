import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import UsersService from './users.service'
import { Secret, sign } from 'jsonwebtoken'
import { compareSync } from 'bcryptjs'
import RolesService from '../roles/roles.service'
import Logger, { IError } from '../logger'
import { IJwt } from './users.interface'
import dotenv from 'dotenv'
dotenv.config({
    debug: true,
    override: true
})

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
    private static instance: UsersController;

    static getInstance(): UsersController { //паттерн singleton одиночка
        if (!UsersController.instance) {
            UsersController.instance = new UsersController();
        }
        return UsersController.instance;
    }

///////////////
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400)
                    .json({message: "Ошибка при регистрации", errors})
            }
            const result = await UsersService.registration(req.body)
            return res.status(201).json(result)
        } catch (e) {
            const err = e as IError
            Logger.error(err.message, {controller_users: 'registration'})
            return res.status(400).json('что-то пошло не так!')
        }
    }///////////////registration


    async login(req: Request, res: Response) {
        try {
            let password: string
            let nickname: string
            ({password, nickname} = req.body)
            const user = await UsersService.getUserByNickname(req.body)
            if (!user.result) {
                return res.status(400)
                    .json(user.message)
            }
            const roles = await RolesService.getRoleById(user.result.roles_id)
            if (!roles.result) {
                return res.status(400)
                    .json(roles.message)
            }
            const validPassword = compareSync(password, user.result.password)
            if (!validPassword) {
                return res.status(400)
                    .json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(
                user.result.id,
                user.result.nickname,
                roles.result.name,
                user.result.roles_id)
            return res.json({token})
        } catch (error) {
            const err = error as IError
            Logger.error(err.message, {controller_users: 'login'})
            return res.status(400).json({message: 'Login error'})
        }
    } /////////////////login
    
    async updateUser(req: Request, res: Response) {
            try {
                if (!req.params.id) {
                    return res.status(500).json('Не указан Id пользователя')
                }
                const id = Number(req.params.id)
                const authUser = req.user as IJwt
                const result = await UsersService.updateUserById(id, req.body, authUser.roles_id)
                return res.status(201).json(result.message)
            } catch (error) {
                const err = error as IError
                Logger.error(err.message, {controller_users: 'updateUser'})
                return res.status(500).json('updateUser error')
            }
    }
    

    async getUsers(req: Request, res: Response) {

        try {
            const limit: number = Number(req.query.limit || 10)
            const offset: number = Number(req.query.offset || 1)
            const listUsers = await UsersService.getUsers(limit, offset)
            return res.status(200).json(listUsers)
        } catch (error) {
            const err = error as IError
            Logger.error(err.message, {controller_users: 'getUsers'})
            return res.status(500).json('Не удалось получить список пользователей')
        }

    }

    async getUserById(req: Request, res: Response) {
        try {
            if (!req.params.id) {
                return res.status(500).json('Не указан Id пользователя')
            }
            const id = Number(req.params.id)
            const User = await UsersService.getUserById(id)
            return res.status(200).send(User)
        } catch (e) {
            const err = e as IError
            Logger.error(err.message, {controller_users: 'getUserById'})
            return res.status(500).json('getUserById error')
        }
    }
    
    async deleteUserById(req: Request, res: Response) {
        try {
            if (!req.params.id) {
                return res.status(500).json('Не указан Id пользователя')
            }
            const id = Number(req.params.id)
            const User = await UsersService.deleteUserById(id)
            return res.status(200).send(User)
        } catch (e) {
            const err = e as IError
            Logger.error(err.message, {controller_users: 'deleteUserById'})
            return res.status(500).json('deleteUserById error')
        }
    }

    async searchUsers(req: Request, res: Response) {

        try {
            //const start = new Date().getTime();
            const nickname: string = String(req.query.nickname || '')
            const limit: number = Number(req.query.limit || 1)
            const offset: number = Number(req.query.offset || 1)
            const listUsers = await UsersService.searchUsers(nickname, limit, offset)
            //const end = new Date().getTime();
            //logger.info(`время выполнения - ${end - start}ms`, {controller_users: 'searchUsers'})
            return res.status(200).send(listUsers)
        } catch (e) {
            const err = e as IError
            Logger.error(err.message, {controller_users: 'searchUsers'})
            return res.status(500).json('что-то пошло не так!')
        }
    }


}

export default UsersController.getInstance();
import {Request, Response, NextFunction} from 'express'
import {Secret, verify} from 'jsonwebtoken'
import dotenv from 'dotenv'
import {IJwt} from "../users/users.interface";
import Logger, {IError} from "../logger";

dotenv.config()

export const RoleMiddleware = (roles: string[] | string) => {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            if (!req.headers.authorization) {
                return res.status(403)
                    .json({message: "Пользователь не авторизован"})
            }
            const token: string = req.headers.authorization.split(' ')[1] || '';
            const secret: Secret = process.env.JWT_ACCESS_SECRET || ''
            if ((token === '') || (secret === '')) {
                return res.status(403)
                    .json({message: "Пользователь не авторизован"})
            }

            const verifyUser = verify(token, secret) as IJwt

            req.user = verifyUser


            const jwtPayload = verifyUser;


            if (!jwtPayload) {
                return res.status(403)
                    .json({message: "Неверный ключ или токен"})
            }

            const userRoles: string = jwtPayload.roles



            let needRoles: string[] = ['admin']//всегда даем права админу]
            const useRoles: string[] = [userRoles]

            if (typeof (roles) === "object") {
                needRoles = [...needRoles, ...roles]
            } else {
                needRoles = [...needRoles, roles]
            }
            let hasRole = false
            useRoles.forEach(role => {
                if (needRoles.includes(role)) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                return res.status(403)
                    .json({message: "У вас нет доступа"})
            }
            next();
        } catch (e) {
            const err = e as IError
            Logger.error(err.message, {middleware: 'RoleMiddleware'})
            return res.status(403)
                .json({message: "Пользователь не авторизован"})
        }
    }
};
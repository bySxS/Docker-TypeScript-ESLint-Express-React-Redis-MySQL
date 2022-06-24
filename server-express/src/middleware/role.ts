import {Request, Response, NextFunction} from 'express'
import {JwtPayload, Secret, verify} from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

module.exports = function (roles: [string] | string) {
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

            if ((token === '')||(secret === '')) {
                return res.status(403)
                    .json({message: "Пользователь не авторизован"})
            }

            const jwtPayload: JwtPayload | string = verify(token, secret);

            if ((!jwtPayload) ||
                (typeof jwtPayload === "string") ||
                (!jwtPayload.roles)) {
                return res.status(403)
                    .json({message: "Неверный ключ или токен"})
            }

            const userRoles: string = jwtPayload.roles

            let needRoles: [...[string], ...[string]] | [string] = ['admin']//всегда даем права админу]
            const useRoles: [string] = [userRoles]

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
            // console.log(e)
            return res.status(403)
                .json({message: "Пользователь не авторизован"})
        }
    }
};
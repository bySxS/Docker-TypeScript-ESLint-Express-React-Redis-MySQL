import {Request, Response, NextFunction} from 'express'
import {JwtPayload, Secret, verify} from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface IGetUserAuthInfoRequest extends Request {
    user: string | JwtPayload // or any other type
}

module.exports = function (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const token: string = req.headers.authorization.split(' ')[1] || '';
        const secret: Secret = process.env.JWT_ACCESS_SECRET || ''
        if ((token === '') || (secret === '')) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }

        req.user = verify(token, secret)
        next()
    } catch (e) {
        //console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};
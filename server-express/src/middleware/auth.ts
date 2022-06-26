import { Request, Response, NextFunction } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IJwt } from '../users/users.interface'
import Logger, { IError } from '../logger'
dotenv.config()

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    if (!req.headers.authorization) {
      return res.status(403)
        .json({ message: 'Пользователь не авторизован' })
    }
    const token: string = req.headers.authorization.split(' ')[1] || ''
    const secret: Secret = process.env.JWT_ACCESS_SECRET || ''
    if ((token === '') || (secret === '')) {
      return res.status(403)
        .json({ message: 'Пользователь не авторизован' })
    }

    req.user = verify(token, secret) as IJwt
    next()
  } catch (e) {
    const err = e as IError
    Logger.error(err.message, { middleware: 'AuthMiddleware' })
    return res.status(403).json({ message: 'Пользователь не авторизован' })
  }
}

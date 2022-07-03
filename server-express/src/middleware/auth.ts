import { Request, Response, NextFunction } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import { IJwt } from '../users/users.interface'
import Logger, { IError } from '../logger'

export const Auth = (req: Request): boolean => {
  try {
    if (!req.headers.authorization) {
      return false
    }
    const token: string = req.headers.authorization.split(' ')[1] || ''
    const secret: Secret = process.env.JWT_ACCESS_SECRET || ''
    if ((token === '') || (secret === '')) {
      return false
    }

    req.user = verify(token, secret) as IJwt
  } catch (e) {
    const err = e as IError
    Logger.error(err.message, { middleware: 'AuthMiddleware' })
    return false
  }
  return true
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  if (!Auth(req)) {
    return res.status(403)
      .json({ message: 'Пользователь не авторизован или время сессии истекло' })
  }
  next()
}

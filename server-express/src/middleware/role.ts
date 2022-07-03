import { Request, Response, NextFunction } from 'express'
import Logger, { IError } from '../logger'
import { Auth } from './auth'

export const RoleMiddleware = (roles: string[] | string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!Auth(req)) {
      return res.status(403)
        .json({ message: 'Пользователь не авторизован или время сессии истекло' })
    }
    try {
      const jwtPayload = req.user

      if (!jwtPayload) {
        return res.status(403)
          .json({ message: 'Неверный ключ или токен' })
      }

      const userRoles: string = jwtPayload.roles

      let needRoles: string[] = ['admin']// всегда даем права админу]
      const useRoles: string[] = [userRoles]

      if (typeof (roles) === 'object') {
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
          .json({ message: 'У вас нет доступа' })
      }
      next()
    } catch (e) {
      const err = e as IError
      Logger.error(err.message, { middleware: 'RoleMiddleware' })
      return res.status(403)
        .json({ message: 'У вас нет доступа' })
    }
  }
}

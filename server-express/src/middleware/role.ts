import { Request, Response, NextFunction } from 'express'
import { Auth } from './auth'
import AppError from '../appError'

export const RoleMiddleware = (roles: string[] | string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    // try {
    if (!Auth(req)) {
      throw new AppError('Пользователь не авторизован или время сессии истекло', 403, 'RoleMiddleware')
    }

    const jwtPayload = req.user

    if (!jwtPayload) {
      throw new AppError('Неверный ключ или токен', 403, 'RoleMiddleware')
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
      throw new AppError('У вас нет доступа', 403, 'RoleMiddleware')
    }
    next()
    // } catch (err) {
    //   next(err)
    // }
  }
}

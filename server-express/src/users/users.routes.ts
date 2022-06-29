import { Express } from 'express'
import UsersController from './users.controller'
import { check } from 'express-validator'
import { RoleMiddleware } from '../middleware/role'
import { AuthMiddleware } from '../middleware/auth'
import logger, { IError } from '../logger'

function UsersRoutes (app: Express) {
  try {
    app.post('/registration',
      [
        check('nickname',
          'Имя пользователя не может быть пустым')
          .notEmpty(),
        check('password',
          'Пароль должен быть больше 4 и меньше 10 символов')
          .isLength({ min: 4, max: 10 })
      ], UsersController.registration)

    app.post('/login', UsersController.login)
    app.get('/users', UsersController.getUsers)
    app.get('/users/:id', AuthMiddleware, UsersController.getUserById)
    app.delete('/del_users/:id', RoleMiddleware(['admin']), UsersController.deleteUserById)
    app.put('/user_update/:id', AuthMiddleware, UsersController.updateUser)
    app.get('/search_users', AuthMiddleware, UsersController.searchUsers)
  } catch (e) {
    const err = e as IError
    logger.error('UsersRoutes error ' + err.message, { Routes: 'Users' })
  }
}

export default UsersRoutes

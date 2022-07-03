import { Express } from 'express'
import UsersController from './users.controller'
import { RoleMiddleware } from '../middleware/role'
import { AuthMiddleware } from '../middleware/auth'
import logger, { IError } from '../logger'
import { validateRegistration } from './users.validator'

function UsersRoutes (app: Express) {
  try {
    app.post('/registration', validateRegistration(), UsersController.registration)
    app.post('/login', UsersController.login)
    app.get('/users', RoleMiddleware(['user', 'moder', 'admin']), UsersController.getUsers)
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

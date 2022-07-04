import { Express } from 'express'
import UsersController from './users.controller'
import { RoleMiddleware } from '../middleware/role'
import { AuthMiddleware } from '../middleware/auth'
import { validateRegistration } from './users.validator'
import AppError from '../appError'

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
    throw new AppError('Ошибка в Users routers')
  }
}

export default UsersRoutes

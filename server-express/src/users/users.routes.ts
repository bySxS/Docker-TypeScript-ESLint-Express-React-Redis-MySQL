import { Express } from 'express'
import UsersController from "./users.controller"
import { check } from "express-validator"
import { RoleMiddleware } from '../middleware/role'
import { AuthMiddleware } from '../middleware/auth'

function UsersRoutes(app: Express) {
    app.post('/registration',
        [
            check('nickname',
                "Имя пользователя не может быть пустым")
                .notEmpty(),
            check('password',
                "Пароль должен быть больше 4 и меньше 10 символов")
                .isLength({min: 4, max: 10})
        ], UsersController.registration)

    app.post('/login', UsersController.login)
    app.get('/users', RoleMiddleware(["user", "admin"]), UsersController.getUsers)
    app.put('/user_update/:id', AuthMiddleware, UsersController.updateUser)
    app.get('/search_users', AuthMiddleware, UsersController.searchUsers)




}

export default UsersRoutes;
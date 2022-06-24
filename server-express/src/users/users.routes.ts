import { Express } from 'express'
import { UsersController } from "./users.controller"
import { check } from "express-validator"

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


}

export default UsersRoutes;
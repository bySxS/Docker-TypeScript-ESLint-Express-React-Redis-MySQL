import { check } from 'express-validator'

export const validateRegistration = () => {
  return [
    check('nickname',
      'Имя пользователя не может быть пустым')
      .notEmpty(),
    check('password',
      'Пароль должен быть больше 4 и меньше 10 символов')
      .isLength({ min: 4, max: 10 })
  ]
}

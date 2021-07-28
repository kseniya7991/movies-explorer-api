const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

//Сюда вписать контроллеры  файнд и шоу


// Информация о текущем пользователе
router.get('/me', getCurrentUser);

// Обновление данных текущего пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  })
}) , updateUser)


module.exports = router;

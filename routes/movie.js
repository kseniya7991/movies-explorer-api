const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');


//Сюда испортировать контроллеры

//Получить все сохраненные фильмы
router.get('/', getSavedMovies)

//Создать новый фильм
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(method, 'Validation Link'),
    trailer: Joi.string().required().custom(method, 'Validation Link'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(method, 'Validation Link'),
    movieId: Joi.string().hex().length(24),
  })
}), createMovie)

//Удалить сохраненный фильм по ID
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  })
}))

module.exports = router;
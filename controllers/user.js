const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Импорт ошибок
const BadRequest = require('../errors/bad-req-err');
const NotFound = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');

module.exports.getCurrentUser = (req, res, next) => {
  async function getCurrentUser() {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        return res.send({ user });
      }
      return next(new NotFound('Пользователь не найден'))
    } catch (err) {
      if (err.name === 'CastError') {
        return next(new NotFound('Пользователь не найден'));
      }
      return next(new InternalServerError('На сервере проихошла ошибка'))
    }
  }
  getCurrentUser();
}

module.exports.updateUser = (req, res, next) => {
  async function updateUser() {
    try{
      const userId = req.user._id;
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(userId, { name, email },
        {
          new: true,
          runValidators: true,
        });
      if (user) {
        return res.send({ user });
      }
      return next(new NotFound('Пользователь не найден'));
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные пользователя'));
      } if (err.name === 'CastError') {
        return next(new NotFound('Пользователь не найден'))
      }
      return next(new InternalServerError('На сервере проихошла ошибка'))
    }
  }
  updateUser();
}
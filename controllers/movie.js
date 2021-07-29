const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Movie = require('../models/movie');

// Импорт ошибок
const BadRequest = require('../errors/bad-req-err');
const NotFound = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');


module.exports.getSavedMovies = (req, res, next) => {
  async function getSavedMovies() {
    try {
      const movies = await Movie.find({});
      return res.send({ movies })
    } catch (err) {
      return next(new InternalServerError('На сервере произошла ошибка 1'))
    }
  }
  getSavedMovies();
}

module.exports.createMovie = (req, res, next) => {
  async function createMovie() {
    try {
      const userId = req.user._id;
      const {country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
         } = req.body;
      const movie = await Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        owner: userId,
        movieId});
      return res.status(201).send({ movie })
    } catch (err) {
      console.log(err)
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные фильма'))
      }
      return next(new InternalServerError('На сервере проихошла ошибка 2'))
    }
  }
  createMovie();
}

module.exports.deleteMovie = (req, res, next) => {
  async function deleteMovie() {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId)
      if (deletedMovie) {
        return res.send({ movie })
      }
      return next(new NotFound('Фильм не найден'));
    } catch (err) {
      if (err.name === 'CastError') {
        return next(new NotFound('Фильм не найден'));
      }
      return next(new InternalServerError('На сервере проихошла ошибка 3'));
    }
  }
  deleteMovie();
}
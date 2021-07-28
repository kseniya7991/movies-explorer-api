const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Movie = require('../models/movie');

module.exports.getSavedMovies = (req, res, next) => {
  async function getSavedMovies() {
    try {
      const movies = Movie.find({});
      return res.send(movies)
    } catch (err) {
      return next()
    }
  }
  getSavedMovies();
}

module.exports.createMovie = (req, res, next) => {
  async function createMovie() {
    try {
      const {country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId } = req.body;
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
        movieId});
      return res.status(201).send({ movie })
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next()
      }
      return next()
    }
  }
  createMovie();
}

module.exports.deleteMovie = (req, res, next) => {
  async function deleteMovie() {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId)
      return res.send({ movie })
    } catch (err) {
      if (err.name === 'CastError') {
        return next();
      }
      return next();
    }
  }
  deleteMovie();
}
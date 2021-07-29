require('dotenv').config()

const express = require('express');
const handleErrors = require('./handle-errors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, isCelebrateError } = require('celebrate');
const validator = require('validator');

const NotFoundError = require('./errors/not-found-err')

const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'));

app.use('/users', userRoutes);
app.use('/movies', movieRoutes)

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден 1'));
});

app.use((err, req, res, next) => {
  handleErrors(err, req, res);
});

module.exports = app;
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https:\/\/[a-z0-9]*\.?[a-z0-9]*\.?[a-z0-9-]*\.?[a-z]*\/?[a-zA-Z0-9-._~:?#[\]/@!$&'()*+,;=-]*#?\s?$/.test(v);;
      },
      message: 'Введите корректную ссылку',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https:\/\/[a-z0-9]*\.?[a-z0-9]*\.?[a-z0-9-]*\.?[a-z]*\/?[a-zA-Z0-9-._~:?#[\]/@!$&'()*+,;=-]*#?\s?$/.test(v);;
      },
      message: 'Введите корректную ссылку',
    },
   },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https:\/\/[a-z0-9]*\.?[a-z0-9]*\.?[a-z0-9-]*\.?[a-z]*\/?[a-zA-Z0-9-._~:?#[\]/@!$&'()*+,;=-]*#?\s?$/.test(v);;
      },
      message: 'Введите корректную ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  nameRU: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('movie', movieSchema);


/* owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
  required: true
}, */
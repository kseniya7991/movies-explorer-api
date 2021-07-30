const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введите корректный email',
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

userSchema.statics.findUserBeCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
  .then((user) => {
    if(!user) {
      return Promise.reject(new BadRequest('Неправильные почта или пароль') )
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
      if(!matched) {
        return Promise.reject(new BadRequest('Неправильные почта или пароль') )
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getCurrentUser = (req, res, next) => {
  async function getCurrentUser() {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        return res.send({ user });
      }
      return next()
    } catch (err) {
      if (err.name === 'CastError') {
        return next();
      }
      return next()
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
      return next();
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next();
      } if (err.name === 'CastError') {
        return next()
      }
      return next()
    }
  }
  updateUser();
}
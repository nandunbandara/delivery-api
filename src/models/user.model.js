(() => {
  'use strict';

  const mongoose = require('mongoose');
  const crypto = require('crypto');
  const jwt = require('jsonwebtoken');

  const {Schema} = mongoose;

  const UserSchema = new Schema({
    email: String,
    hash: String,
    salt: String,
  });

  UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = generateHash(password);
  };

  UserSchema.methods.validatePassword = (password) =>
    this.hash === generateHash(password);

  UserSchema.methods.generateJWT = () => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, '1qaz2wsx@');
  };

  UserSchema.methods.toAuthJSON = () => {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT(),
    };
  };

  const generateHash = (v) => crypto
      .pbkdf2Sync(v, this.salt, 10000, 512, 'sha512').toString('hex');

  module.exports = mongoose.model('User', UserSchema);
})();

const mongoose = require('mongoose');
const validators = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validators.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    validate:{
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  photo: String
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await  bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const User = require('../models/userModel');
const catchAsync = require('./../utils/chatchAsync');
const jwt = require('jsonwebtoken');
// const authController = require('./authController');

exports.createUser = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SCRET, {
      expiresIn: process.env.JWT_EXP
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
          user: newUser
        }
      });
  });
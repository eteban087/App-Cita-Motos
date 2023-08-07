const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const { where } = require('sequelize');

const validationsUsers = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).json({
      status: 'Error',
      message: 'user already exists',
    });
  }

  next();
};

const validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`user with id ${id} not found`, 404));
  }

  req.user = user;
  next();
});

const protect = catchAsync(async (req, res, next) => {
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  }

  //only if you have the functionality to change password
  /*
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      const changedTimeStamp = parseInt(
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError(
          'User recently changed password!, please login again.',
          401
        )
      );
    }
  }
  */

  req.sessionUser = user;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }

    next();
  };
};

module.exports = { validationsUsers, protect, restrictTo, validUser };

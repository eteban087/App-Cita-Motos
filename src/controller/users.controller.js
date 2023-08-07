const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const generateJWT = require('../helpers/jsonwebtoken');
const User = require('../models/users.model');
const bycript = require('bcryptjs');

// ===========================FUNCION PARA OBTENER TODOS LOS USUARIOS========================
const findUsers = catchAsync(async (req, res, next) => {
  console.log(req.headers.authorization);
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'users retrieved successfully!',
    results: users.length,
    users,
  });
});

// ===========================FUNCION PARA BUSCAR UN USUARIO========================
const findUser = catchAsync(async (req, res, next) => {
  const { user } = await req;

  return res.status(200).json({
    status: 'success',
    message: 'user retrieved successfully!',
    user,
  });
});

// ===========================FUNCION PARA CREAR UN USUARIO========================
const createUser = catchAsync(async (req, res, next) => {
  const { role, password, email, name } = req.body;

  const salt = await bycript.genSalt(12);
  const encryptedPassword = await bycript.hash(password, salt);

  const user = await User.create({
    name,
    password: encryptedPassword,
    email: email.toLowerCase().trim(),
    role,
  });

  const token = await generateJWT(user.id);

  return res.status(201).json({
    status: 'success',
    message: 'user created successfully!',
    token,
    user,
  });
});

// =======================FUNCION DEL LOGIN=======================
const logIn = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({
    where: {
      status: 'available',
      email: email.toLowerCase().trim(),
    },
  });

  if (!user) {
    return next(
      new AppError(`the user with email ${email} does not exist!`),
      404
    );
  }

  if (!(await bycript.compare(password, user.password))) {
    return res.status(400).json({
      status: 'Error',
      message: `Incorrect email or password`,
    });
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token: token,
    user,
  });
});

// ===========================FUNCION PARA ACTUALIZAR USUARIOS========================
const updateUser = catchAsync(async (req, res, next) => {
  const { email, name } = req.body;
  const { user } = await req;

  user.update({
    email,
    name,
  });

  return res.status(200).json({
    status: 'success',
    message: 'user update successfully!',
  });
});
// ===========================FUNCION PARA ELIMINAR USUARIOS========================
const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = await req;

  user.update({
    status: 'unavailable',
  });

  return res.status(200).json({
    status: 'success',
    message: 'User delete',
  });
});

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  logIn,
};

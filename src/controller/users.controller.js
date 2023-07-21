const User = require('../models/users.model');

// ===========================FUNCION PARA OBTENER TODOS LOS USUARIOS========================
const findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: true,
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'users retrieved successfully!',
      results: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};
// ===========================FUNCION PARA BUSCAR UN USUARIO========================
const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `the user with id ${id} does not exist!`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'user retrieved successfully!',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};
// ===========================FUNCION PARA CREAR UN USUARIO========================
const createUser = async (req, res) => {
  const { role, password, email, name } = req.body;
  const user = await User.create({
    name,
    password,
    email,
    role,
  });
  try {
    return res.status(201).json({
      status: 'success',
      message: 'user created successfully!',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};
// ===========================FUNCION PARA ACTUALIZAR USUARIOS========================
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;
    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `the user with id ${id} does not exist!`,
      });
    }

    user.update({
      email,
      name,
    });

    return res.status(200).json({
      status: 'success',
      message: 'user update successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};
// ===========================FUNCION PARA ELIMINAR USUARIOS========================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `the user with id ${id} does not exist!`,
      });
    }

    user.update({
      status: false,
    });

    return res.status(200).json({
      status: 'success',
      message: 'User delete',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};

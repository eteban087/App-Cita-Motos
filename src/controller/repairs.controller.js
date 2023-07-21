const Repairs = require('../models/repairs.model');

// ======================FUNCION PARA OBTENER TODOS LOS REPAIRS===============
const findRepairs = async (req, res) => {
  try {
    const repairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
    });
    return res.status(200).json({
      status: 'success',
      message: 'repairs retrieved successfully!',
      results: repairs.length,
      repairs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};
// ======================FUNCION PARA OBTENER UN  REPAIR=======================
const findRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'Error',
        message: `the user with id ${id} does not exist!`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'repair retrieved successfully!',
      repair,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};
// ======================FUNCION PARA CREAR UN  REPAIR=======================
const createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const repair = await Repairs.create({
      date,
      userId,
    });
    return res.status(201).json({
      status: 'success',
      message: 'created repair!',
      repair,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};
// ======================FUNCION PARA ACTUALIZAR UN  REPAIR=======================
const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'Error',
        message: `the user with id ${id} does not exist!`,
      });
    }
    repair.update({
      status: 'completed',
    });

    return res.status(200).json({
      status: 'success',
      message: 'repair updated!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
      error,
    });
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'Error',
        message: `the user with id ${id} does not exist!`,
      });
    }
    repair.update({
      status: 'cancelled',
    });

    return res.status(200).json({
      status: 'success',
      message: 'repair cancelled!',
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
  findRepair,
  findRepairs,
  updateRepair,
  deleteRepair,
  createRepair,
};

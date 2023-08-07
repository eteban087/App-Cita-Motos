const catchAsync = require('../helpers/catchAsync');
const Repairs = require('../models/repairs.model');

// ======================FUNCION PARA OBTENER TODOS LOS REPAIRS===============
const findRepairs = catchAsync(async (req, res) => {
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
});
// ======================FUNCION PARA OBTENER UN  REPAIR=======================
const findRepair = catchAsync(async (req, res) => {
  const { repair } = await req;

  return res.status(200).json({
    status: 'success',
    message: 'repair retrieved successfully!',
    repair,
  });
});
// ======================FUNCION PARA CREAR UN  REPAIR=======================
const createRepair = catchAsync(async (req, res) => {
  const { date, description, motorsNumber } = req.body;
  const { id } = req.sessionUser;
  const repair = await Repairs.create({
    date,
    userId: id,
    description,
    motorsNumber,
  });
  return res.status(201).json({
    status: 'success',
    message: 'created repair!',
    repair,
  });
});
// ======================FUNCION PARA ACTUALIZAR UN  REPAIR=======================
const updateRepair = catchAsync(async (req, res) => {
  const { repair } = await req;

  repair.update({
    status: 'completed',
  });

  return res.status(200).json({
    status: 'success',
    message: 'repair updated!',
  });
});

const deleteRepair = catchAsync(async (req, res) => {
  const { repair } = await req;

  repair.update({
    status: 'cancelled',
  });

  return res.status(200).json({
    status: 'success',
    message: 'repair cancelled!',
  });
});

module.exports = {
  findRepair,
  findRepairs,
  updateRepair,
  deleteRepair,
  createRepair,
};

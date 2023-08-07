const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Repairs = require('../models/repairs.model');

const validRepairs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return next(new AppError(`the user with id ${id} does not exist!`), 404);
  }
  req.repair = repair;
  next();
});

module.exports = { validRepairs };

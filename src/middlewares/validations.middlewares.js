const { validationResult, body } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

const createUserValidation = [
  body('name').notEmpty().withMessage('name is require'),
  body('email')
    .isEmail()
    .withMessage('enter valid email')
    .notEmpty()
    .withMessage('email is require'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .matches(/[a-zA-Z]/)
    .withMessage('password must have at least one letter')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters'),
  this.validateFields,
];

const createRepairValidation = [
  body('date').notEmpty().withMessage('date is require'),
  body('motorsNumber').notEmpty().withMessage('motorsNumber is require'),
  body('description').notEmpty().withMessage('description is required'),
  this.validateFields,
];

const logInUserValidation = [
  body('password').notEmpty().withMessage('password is required'),
  body('email').notEmpty().withMessage('email is required'),
  this.validateFields,
];

module.exports = {
  createUserValidation,
  createRepairValidation,
  logInUserValidation,
};

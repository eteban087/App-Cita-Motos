const User = require('../models/users.model');

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

module.exports = { validationsUsers };

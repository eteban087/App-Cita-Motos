const express = require('express');
const router = express();
const { validationsUsers } = require('../middlewares/users.middlewares');
const {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/users.controller');

router.route('/').get(findUsers).post(validationsUsers, createUser);

router.route('/:id').get(findUser).patch(updateUser).delete(deleteUser);

module.exports = router;

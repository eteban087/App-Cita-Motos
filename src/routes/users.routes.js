const express = require('express');
const router = express();

const {
  validationsUsers,
  validUser,
} = require('../middlewares/users.middlewares');

const {
  createUserValidation,
  logInUserValidation,
} = require('../middlewares/validations.middlewares');
const {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  logIn,
} = require('../controller/users.controller');

router.use('/login', logInUserValidation, logIn);

router

  .route('/')
  .get(findUsers)
  .post(createUserValidation, validationsUsers, createUser);

router
  .use('/:id', validUser)
  .route('/:id')
  .get(findUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;

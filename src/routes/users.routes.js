const express = require('express');
const router = express();

const {
  validationsUsers,
  validUser,
  protectAccountOwner,
  protect,
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
  .get(protect, findUsers)
  .post(createUserValidation, validationsUsers, createUser);
router.use(protect);

router
  .use('/:id', validUser)
  .route('/:id')
  .get(findUser)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = router;

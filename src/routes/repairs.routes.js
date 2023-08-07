const express = require('express');
const router = express();

const {
  createRepairValidation,
} = require('../middlewares/validations.middlewares');

const { protect, restrictTo } = require('../middlewares/users.middlewares');
const { validRepairs } = require('../middlewares/repairs.middlewares');

const {
  createRepair,
  deleteRepair,
  findRepair,
  findRepairs,
  updateRepair,
} = require('../controller/repairs.controller');

router.use(protect);

router
  .route('/')
  .get(restrictTo('employee'), findRepairs)
  .post(createRepairValidation, createRepair);

router.use(restrictTo('employee'));

router
  .use('/:id', validRepairs)
  .route('/:id')
  .get(findRepair)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = router;

const express = require('express');
const router = express();

const {
  createRepair,
  deleteRepair,
  findRepair,
  findRepairs,
  updateRepair,
} = require('../controller/repairs.controller');

router.route('/').get(findRepairs).post(createRepair);
router.route('/:id').get(findRepair).patch(updateRepair).delete(deleteRepair);

module.exports = router;

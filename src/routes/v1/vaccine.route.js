const express = require('express');
const vaccineController = require('../../controllers/vaccine.controller');

const router = express.Router();

router.get('/', vaccineController.list);
router.get('/:city', vaccineController.get);

module.exports = router;

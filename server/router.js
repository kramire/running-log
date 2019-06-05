const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/runs.js');

router.postOneRun = ctrl.postOneRun;

module.exports = router;
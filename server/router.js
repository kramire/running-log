const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/runs.js');

router.post('/', ctrl.postOneRun);

module.exports = router;
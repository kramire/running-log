const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/runs.js');

router.post('/', ctrl.postOneRun);

router.get('/', ctrl.getRuns);

module.exports = router;
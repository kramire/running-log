const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/runs.js');

router.post('/', ctrl.postOneRun);

router.get('/', ctrl.getRunData);

router.delete('/', ctrl.deleteOneRun);

router.get('/location', ctrl.getBrowserLocation);

router.get('/weather', ctrl.getDayWeather);

module.exports = router;
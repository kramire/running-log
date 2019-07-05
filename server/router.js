const express = require('express');
const router = express.Router();
const ctrlRun = require('./controllers/runs.js');
const ctrlApi = require('./controllers/api.js');

router.post('/', ctrlRun.postOneRun);

router.get('/', ctrlRun.getRunData);

router.delete('/', ctrlRun.deleteOneRun);

router.get('/location', ctrlApi.getBrowserLocation);

router.get('/weather', ctrlApi.getDayWeather);

module.exports = router;
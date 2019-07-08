const model = require('../models/weather.js');
const mongoose = require('mongoose');

// To-Do
exports.getWeather = async function () {}

exports.postWeather = async function () {
  try {
    const data = await model.postWeather();
    res.status(201).send(data);
  }
  catch(e) {
    res.status(404).send(e);
  }
}

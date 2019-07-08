const api = require('../models/api.js');
const mongoose = require('mongoose');

exports.getBrowserLocation = async (req, res) => {
  try {
    const result = await api.getLocationDetails(req.headers.lat, req.headers.long);
    res.status(200).send(result);
  }
  catch (e) {
    res.status(404).send(e);
  }
}

exports.getDayWeather = async (req, res) => {
  const {lat, long, run_date} = req.headers;
  try {
    const result = await api.getWeather(lat, long, run_date);
    res.status(200).send(result);
  }
  catch (e) {
    res.status(404).send(e);
  }
}
const api = require('../models/api.js');
const mongoose = require('mongoose');

exports.getBrowserLocation = async (req, res) => {
  try {
    const result = await api.getLocationDetails(req.headers.lat, req.headers.long);
    res.status(201).send(result);
  }
  catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}

exports.getDayWeather = async (req, res) => {
  const {lat, long, run_date} = req.headers;
  try {
    const result = await api.getWeather(lat, long, run_date);
    res.status(201).send(result);
  }
  catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}
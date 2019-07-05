const model = require('../models/weather.js');
const mongoose = require('mongoose');

exports.getWeather = async function () {

}


exports.postWeather = async function () {
  const data = await model.postWeather()
  res.status(201).send(data);
}


// refactor the original weather api to do just that - get the api's weather
// send that result into this above postWeather request
// then, this above getWeather request should pull the data and format it
// for the client

// get weather request
// ctrl goes to getCachedWeather. 
// if this is null, ctrl goes to api get weather
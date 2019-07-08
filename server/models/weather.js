const mongoose = require('./db.js');
const moment = require('moment');
const Schema = mongoose.Schema;

// Build Schemas
const WeatherSchema = new Schema({
  'city': String,
  'state': String,
  'country': String,
  'dailyData': {
    'date': Date,
    'data': [WeatherDetailsSchema]
  }
});

const WeatherDetailsSchema = new Schema ({
    'time': Number,
    'summary': String,
    'icon': String,
    'sunriseTime': Number,
    'sunsetTime': Number,
    'moonPhase': Number,
    'precipIntensity': Number,
    'precipIntensityMax': Number,
    'precipIntensityMaxTime': Number,
    'precipProbability': Number,
    'temperatureHigh': Number,
    'temperatureHighTime': Number,
    'temperatureLow': Number,
    'temperatureLowTime': Number,
    'apparentTemperatureHigh': Number,
    'apparentTemperatureHighTime': Number,
    'apparentTemperatureLow': Number,
    'apparentTemperatureLowTime': Number,
    'dewPoint': Number,
    'humidity': Number,
    'pressure': Number,
    'windSpeed': Number,
    'windGust': Number,
    'windGustTime': Number,
    'windBearing': Number,
    'cloudCover': Number,
    'uvIndex': Number,
    'uvIndexTime': Number,
    'visibility': Number,
    'ozone': Number,
    'temperatureMin': Number,
    'temperatureMinTime': Number,
    'temperatureMax': Number,
    'temperatureMaxTime': Number,
    'apparentTemperatureMin': Number,
    'apparentTemperatureMinTime': Number,
    'apparentTemperatureMax': Number,
    'apparentTemperatureMaxTime': Number
});

const Weather = mongoose.model('weather', WeatherSchema);

// To-Do: Save Weather.
const postWeather = function (city, state, country, date, data) {};

// To-Do: Build Weather Cache
const getCachedWeather = function (city, state, country, date) {}

module.exports = {
  WeatherSchema, 
  WeatherDetailsSchema,
  postWeather
};

const mongoose = require('./db.js');
const moment = require('moment');

// Build Schemas

const Schema = mongoose.Schema;

const WeatherSchema = new Schema (
  {
    'latitude': Number,
    'longitude': Number,
    'date': Date,
    'daily': {
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

module.exports = {
  WeatherSchema, 
  WeatherDetailsSchema
};

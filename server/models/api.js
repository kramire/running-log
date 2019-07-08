const mongoose = require('./db.js');
const moment = require('moment');
const fetch = require('node-fetch');
require('dotenv').config();

const {
  API_URL_LOCATION,
  API_KEY_LOCATION,
  API_URL_WEATHER,
  API_KEY_WEATHER
} = process.env;

async function getLocationDetails(lat, long) {
  const baseUrl = `${API_URL_LOCATION}key=${API_KEY_LOCATION}`;
  const revGeoCodeUrl = `${baseUrl}&lat=${lat}&lon=${long}&format=json`;

  return fetch(revGeoCodeUrl)
    .then(res => res.json())
    .then(data => ({
      latitude: lat,
      longitude: long,
      city: data.address.city,
      state: data.address.state && data.address.city !== data.address.state,
      country: data.address.country
    }));
}

async function getWeather(lat, long, runDate) {
  const formatDate = moment(runDate).format('YYYY-MM-DD');
  const baseUrl = `${API_URL_WEATHER}/${API_KEY_WEATHER}`;
  const weatherUrl = `${baseUrl}/${lat},${long},${formatDate}T00:00:00?exclude=[currently, hourly],flags`;

  return fetch(weatherUrl)
    .then(res => res.json())
    .then(data => ({
      'summary': data.daily.data[0].summary,
      'icon': data.daily.data[0].icon,
      'tempHigh': data.daily.data[0].temperatureHigh,
      'tempLow': data.daily.data[0].temperatureLow,
      'humidity': data.daily.data[0].humidity,
      'precipProbability': data.daily.data[0].precipProbability,
      'windSpeed': data.daily.data[0].windSpeed,
      'uvIndex': data.daily.data[0].uvIndex,
    }));
}

module.exports = {
  getLocationDetails,
  getWeather
};
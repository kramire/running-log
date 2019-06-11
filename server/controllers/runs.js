const model = require('../models/runs.js');
const api = require('../models/api.js');
const mongoose = require('mongoose');

// the min of 0 isn't working on the distance
// something with the fact that the run schema is a child
exports.postOneRun = (req, res) => {
  model.User.findByIdAndUpdate(req.body['_id'], 
    { $push: { runs: new model.Run(req.body.run) } }, 
    {new: true},
    (err, user) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(201).send(
        {
          username: user.username,
          runs: user.runs
        }
      );
  });
};

exports.getRunData = async (req, res) => {
  const data = await model.calcWeeklyData(req.headers['_id']);
  res.status(201).send(data);
}

exports.deleteOneRun = async (req, res) => {
  
  try {
    const result = await model.deleteRun(req.headers['user_id'], req.headers['run_id']);
    res.status(201).send(result);
  }
  catch (e) {
    res.status(400).send(e);
  }
}

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


 
const model = require('../models/runs.js');
const mongoose = require('mongoose');


exports.postOneRun = async (req, res) => {
  const data = await model.postRun(req.body['_id'], req.body.run);
  res.status(200).send(data);
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


 
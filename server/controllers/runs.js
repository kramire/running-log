const model = require('../models/runs.js');
const mongoose = require('mongoose');

exports.postOneRun = async (req, res) => {
  try {
    const data = await model.postRun(req.body['_id'], req.body.run);
    res.status(201).send(data);
  }
  catch (e) {
    res.status(404).send(e);
  }
};

exports.getRunData = async (req, res) => {
  try {
    const data = await model.calcWeeklyData(req.headers['_id']);
    res.status(200).send(data);
  } catch (e) {
    res.status(404).send(e);
  }
}

exports.deleteOneRun = async (req, res) => {
  try {
    const result = await model.deleteRun(req.headers['user_id'], req.headers['run_id']);
    res.status(200).send(result);
  } catch (e) {
    res.status(404).send(e);
  }
}


 
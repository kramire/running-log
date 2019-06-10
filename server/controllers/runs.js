const model = require('../models/runs.js');
const mongoose = require('mongoose');
const moment = require('moment');

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

 
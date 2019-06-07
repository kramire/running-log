const model = require('../models/runs.js');
const mongoose = require('mongoose');
const moment = require('moment');
// import moment from 'moment';

// need to still handle if date already exists
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


exports.getRuns = (req, res) => {
  model.User.findById(req.headers['_id'], 
    (err, user) => {
      if(err) {
        res.status(404).send(err);
      }
      const d = new Date();
      const daysBack = req.headers.history;

      d.setDate(d.getDate()-daysBack);

      const runs = user.runs.filter(run => run.date >= d);
      if (!runs) {
        res.status(401).send({});
      }
      res.status(201).send(runs);
    }
  )
};


exports.getCurrentAcr = (req, res) => {
  const sunThisWk = moment().day(0).toDate();
  model.User.aggregate([
      {$match: {'_id':new mongoose.Types.ObjectId(req.headers['_id'])}},
      {$unwind: '$runs'}, 
      {$match: {'runs.date': {$lt: sunThisWk}}},
      {$group: {'_id': {$week: '$runs.date'}, 'total': {$sum: '$runs.distance'}}},
      {$sort: {'_id': -1}},
      {$limit: 4}
    ])
  .then(
    (result) => {
      const lastWkDistance = result[0].total;
      const avg = result
        .map(el => el.total)
        .reduce((acc,cur) => acc + cur) / result.length;
      res.status(201).send(
        {
          'acr': Math.round(lastWkDistance / avg * 100)/100,
          'startDate': moment().day('Sunday').week(result[3]['_id']+1),
          'endDate': moment().day('Saturday').week(result[0]['_id']+1)
        });
      }
    );
}

 
const mongoose = require('./db.js');
const moment = require('moment');


// Build Schemas

const Schema = mongoose.Schema;

const RunSchema = new Schema({
  distance: {type: Number, required: true, min: 0},
  date: {type: Date, required: true, default: Date.now},
  location: String,
  note: String,
  runType: [String],
  latitude: Number,
  longitude: Number
});

const UserSchema = new Schema({
  username: { type: String, required: true },
  firstName: String,
  unitOfMeasure: { type: String, default: 'mi' },
  weekStart: { type: String, default: 'Sun' },
  trainingFor: String,
  optInAlerts: {type: Boolean, default: true},
  runs: [RunSchema]
});

const Run = mongoose.model('runs', RunSchema);
const User = mongoose.model('users', UserSchema);

const periodStart = moment().subtract(12, 'weeks').day(0); // this determines how much data we get


// Delete Run
function deleteRun (userId, runId) {
  User.findByIdAndUpdate(userId, 
    { $pull: { runs: {'_id': new mongoose.Types.ObjectId(runId)}}}, 
    (result) => {
      return result;
    });
};


// For a given user, return an array of weekly data (as objects).
function calcWeeklyData (userId) {

  return User.aggregate([
    {$match: {'_id':new mongoose.Types.ObjectId(userId)}},
    {$unwind: '$runs'}, 
    {$sort: {'runs.date': 1}},
    {$match: {'runs.date': {$gte: periodStart.toDate(), $lte: moment().toDate()}}},
    {$group: {
      '_id': {$week: '$runs.date'},
      'longestRun': {$max: '$runs.distance'},
      'total': {$sum: '$runs.distance'},
      'runs': {$push: '$runs'}
      }
    },
    {$sort: {'_id': 1}},
  ])
  .then(
     (result) => {
      return result.map((run, i, col) => {
        
        run.week = moment().day('Sunday').week(run['_id']+1).toDate();
        run.prctChange = col[i-1] ? (run.total-col[i-1].total)/col[i-1].total : 0; 
        
        // Calculate ACR
        if (col[i-4]) {
          const avg = (col[i-4].total + col[i-3].total + col[i-2].total + col[i-1].total)/4;
           run.acr = Math.round(col[i-1].total/avg*100)/100 || 0;
           run.acrStartDate = moment().day('Sunday').week(col[i-4]['_id']+1);
           run.acrEndDate = moment().day('Saturday').week(col[i-1]['_id']+1);
        }
        else {
          run.acr = 0;
        }

        return run;
      });
    }
  )
}

module.exports = {
  Run, 
  User,
  deleteRun,
  calcWeeklyData
};
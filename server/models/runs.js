const mongoose = require('./db.js');
const moment = require('moment');

const Schema = mongoose.Schema;

const RunSchema = new Schema({
  distance: {type: Number, required: true, min: 0},
  date: {type: Date, required: true, default: Date.now},
  location: String,
  note: String,
  runType: [String]
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


const periodStart = moment().subtract(12, 'weeks').day(0);

function getWeeklyData (userId) {

  return User.aggregate([
    {$match: {'_id':new mongoose.Types.ObjectId(userId)}},
    {$unwind: '$runs'}, 
    {$match: {'runs.date': {$gte: periodStart.toDate(), $lte: moment().toDate()}}},
    {$group: {'_id': {$week: '$runs.date'}, 'total': {$sum: '$runs.distance'}}},
    {$sort: {'_id': 1}},
  ])
  .then(
     (result) => {
      return result.map((run, i, col) => {
        run.week = moment().day('Sunday').week(run['_id']+1).toDate();
        run.prctChange = col[i-1] ? (run.total-col[i-1].total)/col[i-1].total : 0; 
        return run;
      });
    }
  )
}


function getRunsTest  (userId) {
  return User.findById(userId, 
    (err, user) => {
      if(err) {
        res.status(404).send(err);
      }
      return user.runs.filter(run => {
        (moment(run.date) >= periodStart) && (moment(run.date) <= moment());
      });
    }
  )
}

async function createDataObj (userId) {
 const allData = await getRunsTest(userId);
 
 const runData = allData.runs.map(d => d.toObject());
 runData.forEach(el => el.week = moment(el.data).startOf('week').toDate());

 const weeklyData = await getWeeklyData (userId);

 return {

 }

}








module.exports = {
  Run, 
  User,
  getWeeklyData,
  createDataObj
};
const mongoose = require('./db.js');

const Schema = mongoose.Schema;

const RunSchema = new Schema({
  distance: {type: Number, required: true, min: 0},
  runDate: {type: Date, required: true, default: Date.now},
  location: String,
  notes: String,
  desc: [String]
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

module.exports = {
  Run, 
  User
};
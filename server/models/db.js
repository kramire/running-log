const mongoose = require('mongoose');

const url = 'mongodb://localhost';
const dbName = 'runningLog';

mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true },
  (err) => {
    if (err) return console.log(err);
    console.log('Connected to database with Mongoose');
  });

module.exports = mongoose;
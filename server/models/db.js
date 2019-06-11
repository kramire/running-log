const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true },
  (err) => {
    if (err) return console.log(err);
    console.log('Connected to database with Mongoose');
  });

module.exports = mongoose;
const model = require('../models/runs.js');


exports.postOneRun = (req, res) => {
  const newRun = new model.Run(req.body);
  newRun.save((err, newRun) => {
    if (err) {
      res.status(401).send('Error saving run.');
    }
    res.status(201).send(newRun);
  })
}

 
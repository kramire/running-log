const model = require('../models/runs.js');

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
  console.log(req.headers['_id']);
  model.User.findById(req.headers['_id'], 
    (err, user) => {
      if(err) {
        res.status(404).send(err);
      }
      const d = new Date();
      const daysBack = 1 + 1;

      d.setDate(d.getDate()-daysBack);

      const runs = user.runs.filter(run => run.date >= d);
      if (!runs) {
        res.status(401).send({});
      }
      res.status(201).send(runs);
    }
  )
};

 
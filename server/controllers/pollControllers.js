const Poll = require("../models/pollModel");

exports.addNewPoll = (req, res) => {
  const newPoll = new Poll(req.body);

  newPoll.save((err, Poll) => {
    if (err) {
      res.send(err);
    }
    res.json(Poll);
  });
};

exports.getPoll = (req, res) => {
  Poll.find({}, (err, Poll) => {
    if (err) {
      res.send(err);
    }
    res.json(Poll);
  });
};

exports.getPollWithID = (req, res) => {
  Poll.findById({ _id: req.params.id }, (err, Poll) => {
    if (err) {
      res.send(err);
    }
    res.json(Poll);
  });
};

exports.UpdatePoll = (req, res) => {
  Poll.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, Poll) => {
      if (err) {
        res.send(err);
      }
      res.json(Poll);
    }
  );
};

exports.deletePoll = (req, res) => {
  Poll.remove({ _id: req.params.id }, (err, Poll) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted Poll" });
  });
};

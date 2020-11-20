const Poll = require("../models/pollModel");
const { User } = require("../models/userModel");

exports.createNewPoll = async (req, res) => {
  const userId = req.user._id;
  const newPoll = new Poll({
    userId,
    ...req.body,
  });

  await newPoll.save((err, Poll) => {
    if (err) {
      res.send(err);
    }
    res.json(Poll);
  });
};

exports.getPollByID = async (req, res) => {
  const pollId = req.params.id;

  try {
    const poll = await Poll.findById({ _id: pollId });
    if (!poll) throw new Error("Poll Not Found");

    res.json(poll);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.getPollsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) throw new Error("User not Found");

    const polls = await Poll.find({ userId });
    if (!polls) throw new Error("Poll Not Found");

    res.json(polls);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.getMyPolls = async (req, res) => {
  const userId = req.user._id;

  try {
    const polls = await Poll.find({ userId });
    if (polls.length === 0) throw new Error("Poll Not Found");

    res.json(polls);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.updatePoll = async (req, res) => {
  const userId = req.user._id;
  const pollId = req.params.id;

  await Poll.findOneAndUpdate(
    { _id: pollId, userId },
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
  const userId = req.user._id;
  const pollId = req.params.id;

  Poll.remove({ _id: pollId, userId }, (err, Poll) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted Poll" });
  });
};

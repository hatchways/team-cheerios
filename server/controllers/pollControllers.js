const mongoose = require("mongoose");
const _ = require("lodash");
const FriendsList = require("../models/friendsListModel");
const Poll = require("../models/pollModel");
const User = require("../models/userModel");
const Vote = require("../models/votesModel");

exports.createNewPoll = async (req, res) => {
  const userId = req.user._id;
  const newPoll = new Poll({
    userId,
    numOfVote1: 0,
    numOfVote2: 0,
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

const lookup = {
  $lookup: {
    from: "users",
    localField: "users",
    foreignField: "_id",
    as: "users",
  },
};

const project = {
  $project: {
    title: 1,
    "users._id": 1,
    "users.name": 1,
    "users.image": 1,
  },
};


exports.getMyPolls = async (req, res) => {
  const userId = req.user._id;

  try {
    const polls = await Poll.find({ userId }).lean(); //plain JS object
    if (polls.length === 0) throw new Error("Poll Not Found");

    const pollandVotes = await Poll.aggregate([
      {
      $lookup: {
        from: "vote",
        localField: "_id",
        foreignField:  "pollId",
        as: "votes",
      },
    }
    ]);
    const friendsListIds = polls.map((poll) => poll.friendsListId);
    const pollIds = polls.map((poll) => poll._id);
    const votes = await Vote.find({ pollId: { $in: pollIds } }).lean();

    const lists = await FriendsList.aggregate([
      {
        $match: {
          $and: [
            { userId: mongoose.Types.ObjectId(userId) },
            { _id: { $in: friendsListIds } },
            //include only friendslistIds associated with users polls
          ],
        },
      },
      lookup,
      project,
    ]);

    for (i in lists) {
      const friendList = lists[i];
      for (k in polls) {
        const poll = polls[k];
        if (_.isEqual(poll.friendsListId, friendList._id)) {
          poll.friendsList = friendList;
        }
      }
    }
    
    res.json(votes);
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

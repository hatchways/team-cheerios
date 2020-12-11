const FriendsList = require("../models/friendsListModel");
const Poll = require("../models/pollModel");
const Vote = require("../models/voteModel");

const validations = async (userId, pollId, choice) => {
  if (choice !== "1" && choice !== "2") throw new Error("Not valid choice");

  const poll = await Poll.findById(pollId);
  if (!poll) throw new Error("Poll not found");

  const friendsList = await FriendsList.findById(poll.friendsListId);
  if (!friendsList.users.includes(userId))
    throw new Error("You cannot vote this poll");
};

exports.voteMyChoice = async (req, res) => {
  const userId = req.user._id;
  const { pollId, choice } = req.params;

  try {
    await validations(userId, pollId, choice);

    const vote = await Vote.findOne({ pollId, userId });
    if (vote) {
      res.json({ message: "You already voted" });
    } else {
      const increment = choice === "1" ? { numOfVote1: 1 } : { numOfVote2: 1 };

      await Poll.update({ _id: pollId }, { $inc: increment });

      await new Vote({
        userId,
        pollId,
        voteFor: choice,
      }).save();

      res.json({ message: "Voted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

// For when the user confirms change the vote
exports.changeMyChoice = async (req, res) => {
  const userId = req.user._id;
  const { pollId, choice } = req.params;

  try {
    await validations(userId, pollId, choice);

    const vote = await Vote.findOne({ pollId, userId });
    if (!vote) throw new Error("You haven't voted Yet");

    if (vote.voteFor !== choice) {
      const increment =
        choice === "1"
          ? { numOfVote1: 1, numOfVote2: -1 }
          : { numOfVote1: -1, numOfVote2: 1 };

      await Poll.update({ _id: pollId }, { $inc: increment });
      await Vote.update({ pollId, userId }, { voteFor: choice });
    } else {
      res.json({ message: "You already vote for that choice" });
    }

    res.json({ message: "Changed your vote successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.deleteAll = async () => {
  try {
   await Vote.deleteMany();
  } catch (err) {
    console.log(err);
  }
};

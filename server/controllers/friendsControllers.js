const Friends = require("../models/friendsModel");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getSuggestedFriends = async (req, res) => {
  // get suggested friends (random) - search query (search by name)
  // 1. display randomly picked users (around 10?)
  //    how to pick random user??
  // 2. search by name : filter by name + #1 func
};

exports.getYourFollowers = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const friends = await Friends.findOne({ userId });
    if (!friends) throw new Error("Friends not found");

    res.json({ followers: friends.followers });
  } catch (err) {
    console.log(err);
    res.status(404).json(err.toString());
  }
};

exports.getYourFollowings = async (req, res) => {
  const { userId } = req.body;

  try {
    const friends = await Friends.findOne({ userId });
    if (!friends) throw new Error("Friends not found");

    res.json({ followings: friends.followings });
  } catch (err) {
    console.log(err);
    res.status(404).json(err.toString());
  }
};

exports.followFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const friends = await Friends.findOne({ userId });

    if (!friends) {
      await new Friends({
        userId,
        followings: [friendId],
      }).save();
    } else {
      const isAlreadyFollow = friends.followings.includes(ObjectId(friendId));
      if (isAlreadyFollow) throw new Error("Already follow");

      await Friends.update({ userId }, { $push: { followings: friendId } });
    }

    const updatedFriends = await Friends.findOne({ userId });
    res.json({ friends: updatedFriends });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.unfollowFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const friends = await Friends.findOne({
      userId,
      followings: { $in: [friendId] },
    });
    if (!friends) throw new Error("Not following");

    await Friends.update({ userId }, { $pull: { followings: friendId } });

    const updatedFriends = await Friends.findOne({ userId });
    res.json({ friends: updatedFriends });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

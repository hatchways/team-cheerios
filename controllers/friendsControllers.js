const mongoose = require("mongoose");

const Friends = require("../models/friendsModel");
const User = require("../models/userModel");

const createNewFriends = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new Error("User not Found");

  return await new Friends({
    userId,
    followings: [],
    followers: [],
    sent: [],
    received: [],
  }).save();
};

const project = {
  _id: 1,
  name: 1,
  image: 1,
};

exports.getSuggestedFriends = async (req, res) => {
  const userId = req.user._id;

  try {
    let myFriends = await Friends.findOne({ userId });
    let myFollowings = [];

    if (!myFriends) {
      myFriend = await createNewFriends(userId);
    } else {
      const allFollowings = myFriends.followings.concat(myFriends.sent);
      myFollowings = allFollowings.map((strId) =>
        mongoose.Types.ObjectId(strId)
      );
    }

    let query = {
      _id: {
        $ne: mongoose.Types.ObjectId(userId),
        $nin: myFollowings,
      },
    };

    if (req.query.search) {
      query = {
        ...query,
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      };
    }

    const suggestions = await User.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $project: project },
    ]).limit(15);

    res.json({ friends: suggestions });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

const getUserInfo = async (ids) =>
  await User.aggregate([
    {
      $match: {
        _id: { $in: ids },
      },
    },
    { $project: project },
  ]);

exports.getYourFollowers = async (req, res) => {
  const userId = req.user._id;
  const keyword = req.query.search;

  try {
    let friends = await Friends.findOne({ userId });
    if (!friends) friends = await createNewFriends(userId);

    let followers = await getUserInfo(friends.followers);
    let received = await getUserInfo(friends.received);

    if (keyword) {
      followers = searchByName(followers, keyword);
      received = searchByName(received, keyword);
    }

    res.json({ followers, received });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.getYourFollowings = async (req, res) => {
  const userId = req.user._id;
  const keyword = req.query.search;

  try {
    let friends = await Friends.findOne({ userId });
    if (!friends) friends = await createNewFriends(userId);

    let followings = await getUserInfo(friends.followings);
    let sent = await getUserInfo(friends.sent);

    if (keyword) {
      followings = searchByName(followings, keyword);
      sent = searchByName(sent, keyword);
    }

    res.json({ followings, sent });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

const searchByName = (list, name) =>
  list.filter((friend) =>
    friend.name.toLowerCase().includes(name.toLowerCase())
  );

exports.followFriend = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params.friendId;

  try {
    // change user's followings status
    let myFriends = await Friends.findOne({ userId });
    if (!myFriends) myFriends = await createNewFriends(userId);

    if (
      myFriends.followings.includes(friendId) ||
      myFriends.sent.includes(friendId)
    )
      throw new Error("Already follow/sent");

    await Friends.updateOne({ userId }, { $push: { sent: friendId } });

    // change friend's followers status
    let followingFriends = await Friends.findOne({ userId: friendId });
    if (!followingFriends) followingFriends = await createNewFriends(friendId);

    if (
      followingFriends.followers.includes(userId) ||
      followingFriends.received.includes(userId)
    )
      throw new Error("Something went wrong...");

    await Friends.updateOne({ userId: friendId }, { $push: { received: userId } });

    res.json({ message: `Request sent to ${friendId} successfully` });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.unfollowFriend = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params.friendId;

  try {
    // remove friend from user's followings
    const myFriends = await Friends.findOne({ userId });
    if (!myFriends) throw new Error("Not following");

    await Friends.updateOne({ userId }, { $pull: { followings: friendId } });

    // remove user from friend's followers
    const followersFriends = await Friends.findOne({ userId: friendId });
    if (!followersFriends) throw new Error("Not follower");

    await Friends.updateOne(
      { userId: friendId },
      { $pull: { followers: userId } }
    );

    res.json({ message: `Unfollow ${friendId}` });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.deleteFriends = async (req, res) => {
  const userId = req.params.userId;

  try {
    const friends = await Friends.findOne({ userId });
    if (!friends) throw new Error("Friends not found");

    await friends.deleteOne();

    res.json({ message: `Friends(userId:${userId}) deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.acceptRequest = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params.friendId;

  try {
    // update user's status to "follower"
    const myFriends = await Friends.findOne({ userId });
    if (!myFriends) throw new Error("Friends not found");

    await Friends.updateOne(
      { userId },
      { $push: { followers: friendId }, $pull: { received: friendId } }
    );

    // update friend's status to "following"
    const followersFriends = await Friends.findOne({ userId });
    if (!followersFriends) throw new Error("Friends not found");

    await Friends.updateOne(
      { userId: friendId },
      { $push: { followings: userId }, $pull: { sent: userId } }
    );

    res.json({ message: `Accept the request from ${friendId}` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.ignoreRequest = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params.friendId;

  try {
    // remove friend from user's received
    const myFriends = await Friends.findOne({ userId });
    if (!myFriends) throw new Error("Friends not found");

    await Friends.updateOne({ userId }, { $pull: { received: friendId } });

    // remove user from friend's sent
    const followersFriends = await Friends.findOne({ userId });
    if (!followersFriends) throw new Error("Friends not found");

    await Friends.updateOne({ userId: friendId }, { $pull: { sent: userId } });

    res.json({ message: `Ignore the request from ${friendId}` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.cancelRequest = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params.friendId;

  try {
    // remove friend from user's sent
    const myFriends = await Friends.findOne({ userId });
    if (!myFriends) throw new Error("Friends not found");

    await Friends.updateOne({ userId }, { $pull: { sent: friendId } });

    // remove user from friend's received
    const followersFriends = await Friends.findOne({ userId });
    if (!followersFriends) throw new Error("Friends not found");

    await Friends.updateOne(
      { userId: friendId },
      { $pull: { received: userId } }
    );

    res.json({ message: `Cancel the request for ${friendId}` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.deleteAll = async () => {
  try {
    await Friends.deleteMany();
  } catch (error) {
    console.log(error);
  }
};

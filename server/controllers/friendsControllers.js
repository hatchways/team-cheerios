const Friends = require("../models/friendsModel");
const { User } = require("../models/userModel");

const createNewFriends = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new Error("User not Found");

  return await new Friends({
    userId,
    followings: [],
    followers: [],
  }).save();
};

exports.getSuggestedFriends = async (req, res) => {
  const userId = req.params.userId; // req.user._id

  try {
    let myFriends = await Friends.findOne({ userId });
    if (!myFriends) myFriend = await createNewFriends(userId);

    const myFollowings =
      myFriends.followings &&
      myFriends.followings.map((followings) => followings.friendId);

    let query = {
      _id: {
        $ne: userId,
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

    const suggestions = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(15);

    res.json({ friends: suggestions });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.getYourFollowers = async (req, res) => {
  const userId = req.params.userId; // req.user._id
  const keyword = req.query.search;

  try {
    let friends = await Friends.findOne({ userId });
    if (!friends) friends = await createNewFriends(userId);

    let followers = friends.followers;
    if (keyword) followers = searchByName(followers, keyword);

    res.json({ friends: followers });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.getYourFollowings = async (req, res) => {
  const userId = req.params.userId; // req.user._id
  const keyword = req.query.search;

  try {
    let friends = await Friends.findOne({ userId });
    if (!friends) friends = await createNewFriends(userId);

    let followings = friends.followings;
    if (keyword) followings = searchByName(followings, keyword);

    res.json({ friends: followings });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

const searchByName = (list, name) =>
  list.filter((friend) =>
    friend.name.toLowerCase().includes(name.toLowerCase())
  );

exports.followFriend = async (req, res) => {
  const userId = req.params.userId; // req.user._id
  const friendId = req.params.friendId;

  try {
    // change user's followings status
    let myFriends = await Friends.findOne({ userId });
    if (!myFriends) myFriends = await createNewFriends(userId);

    const friendInfo = await User.findOne({ _id: friendId });
    if (!friendInfo) throw new Error("User not Found");

    const followRequest = {
      friendId,
      name: friendInfo.name,
      image: friendInfo.image,
      status: "sent",
    };

    const isAlreadyFollow = myFriends.followings.filter(
      (obj) => obj.friendId.toString() === friendId
    );
    if (isAlreadyFollow.length !== 0) throw new Error("Already follow");

    await Friends.update({ userId }, { $push: { followings: followRequest } });

    // change friend's followers status
    let followingFriends = await Friends.findOne({ userId: friendId });
    if (!followingFriends) followingFriends = await createNewFriends(friendId);

    const myInfo = await User.findOne({ _id: userId });
    if (!myInfo) throw new Error("User not Found");

    const followerRequest = {
      friendId: userId,
      name: myInfo.name,
      image: myInfo.image,
      status: "received",
    };

    await Friends.update(
      { userId: friendId },
      { $push: { followers: followerRequest } }
    );

    res.json({ message: `Request sent to ${userId} successfully` });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.unfollowFriend = async (req, res) => {
  const userId = req.params.userId; // req.user._id
  const friendId = req.params.friendId;

  try {
    // remove friend from user's followings
    const myFriends = await Friends.findOne({
      userId,
      "followings.friendId": friendId,
    });
    if (!myFriends) throw new Error("Not following");

    await Friends.updateOne(
      { userId },
      { $pull: { followings: { friendId } } }
    );

    // remove user from friend's followers
    const followersFriends = await Friends.findOne({
      userId: friendId,
      "followers.friendId": userId,
    });
    if (!followersFriends) throw new Error("Not follower");

    await Friends.updateOne(
      { userId: friendId },
      { $pull: { followers: { friendId: userId } } }
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
  const userId = req.params.userId; // req.user._id
  const friendId = req.params.friendId;

  try {
    // update user's status to "follower"
    const myFriends = await Friends.findOne({ userId });
    if (!myFriends) throw new Error("Friends not found");

    await Friends.updateOne(
      { userId, "followers.friendId": friendId },
      { $set: { "followers.$.status": "follower" } }
    );

    // update friend's status to "following"
    const followersFriends = await Friends.findOne({ userId });
    if (!followersFriends) throw new Error("Friends not found");

    await Friends.updateOne(
      { userId: friendId, "followings.friendId": userId },
      { $set: { "followings.$.status": "following" } }
    );

    res.json({ message: `Accept request from ${userId}` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

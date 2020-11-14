const Friends = require("../models/friendsModel");
const { User } = require("../models/userModel");

exports.getSuggestedFriends = async (req, res) => {
  const { userId, keyword } = req.body;

  try {
    const myFriends = await Friends.findOne({ userId });
    const myFollowings = myFriends.followings.map(
      (followings) => followings.friendId
    );

    let query = {
      _id: {
        $nin: myFollowings,
      },
    };

    if (keyword) {
      query = {
        ...query,
        name: {
          $regex: keyword,
          $options: "i",
        },
      };
    }

    const suggestions = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(15);

    res.json({ suggestions });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.getYourFollowers = async (req, res) => {
  const { userId, keyword } = req.body;

  try {
    const friends = await Friends.findOne({ userId });
    if (!friends) throw new Error("Friends not found");

    let followers = friends.followers;
    if (keyword) followers = searchByName(followers, keyword);

    res.json({ followers });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.getYourFollowings = async (req, res) => {
  const { userId, keyword } = req.body;

  try {
    const friends = await Friends.findOne({ userId });
    if (!friends) throw new Error("Friends not found");

    let followings = friends.followings;
    if (keyword) followings = searchByName(followings, keyword);

    res.json({ followings });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.followFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const friends = await Friends.findOne({ userId });

    const friendInfo = await User.findOne({ _id: friendId });
    if (!friendInfo) throw new Error("User not Found");

    const newFriend = {
      friendId,
      name: friendInfo.name,
      image: friendInfo.image,
      status: "sent",
    };

    if (!friends) {
      await new Friends({
        userId,
        followings: [newFriend],
      }).save();
    } else {
      const isAlreadyFollow = friends.followings.filter(
        (obj) => obj.friendId.toString() === friendId
      );
      if (isAlreadyFollow.length !== 0) throw new Error("Already follow");

      await Friends.update({ userId }, { $push: { followings: newFriend } });
    }

    const updatedFriends = await Friends.findOne({ userId });
    res.json({ followings: updatedFriends.followings });
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
      "followings.friendId": friendId,
    });
    if (!friends) throw new Error("Not following");

    await Friends.update({ userId }, { $pull: { followings: { friendId } } });

    const updatedFriends = await Friends.findOne({ userId });
    res.json({ followings: updatedFriends.followings });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.deleteFriends = async (req, res) => {
  const { userId } = req.body;

  try {
    const friends = await Friends.findOne({ userId });
    if (!friends) throw new Error("Friends not found");

    await friends.deleteOne();

    res.json({ message: "Friends deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

const searchByName = (list, name) =>
  list.filter((friend) =>
    friend.name.toLowerCase().includes(name.toLowerCase())
  );


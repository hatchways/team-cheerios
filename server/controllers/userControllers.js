const User = require("../models/userModel");
const Friends = require("../models/friendsModel");
const Poll = require("../models/pollModel");
const mongoose = require("mongoose");

exports.changeProfilePicture = async (req, res) => {
  const email = req.body.email;
  const newImage = req.body.image;
  User.updateOne(
    { email: email },
    {
      image: newImage,
    },
    function (err, affected, resp) {
      if (err) {
        console.log(err);
      }
      res.status(201).send(resp);
    }
  );
};

exports.getFriendsInfo = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.query.userId;
  try {
    const friendsInfo = await Friends.findOne({
      userId: friendId,
      followers: { $in: [mongoose.Types.ObjectId(userId)] },
    }).populate({ path: "userId", select: "_id name image" });

    if (!friendsInfo)
      throw new Error("User is not your friend or does not exist");

    const polls = await Poll.find({ userId: friendId });
    if (!polls) throw new Error("No polls found for this user");

    const numOfFollowers = friendsInfo.followers.length;
    const numOfFollowing = friendsInfo.followings.length;
    const user = friendsInfo.userId; //to remove confusion
    res.status(200).json({
      numOfFollowers,
      numOfFollowing,
      user,
      polls,
    });
  } catch (err) {
    res.status(404).json(err.toString());
  }
};

exports.deleteAll = async () => {
  await User.deleteMany();
};

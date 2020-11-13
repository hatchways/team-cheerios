const { isValidObjectId } = require("mongoose");
const Friends = require("../models/friendsModel");
const ObjectId = require("mongodb").ObjectId;

exports.getYourFollowers = async (req, res) => {
  const { userId } = req.body;

  await Friends.findOne({ userId: ObjectId(userId) }, (err, friends) => {
    if (err) res.send({ error: err });

    res.json(friends.followers);
  });
};

exports.getYourFollowings = async (req, res) => {
  const { userId } = req.body;

  await Friends.findOne({ userId: ObjectId(userId) }, (err, friends) => {
    if (err) res.send({ error: err });

    res.json(friends.followings);
  });
};


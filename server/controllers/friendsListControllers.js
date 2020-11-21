const mongoose = require("mongoose");

const FriendsList = require("../models/friendsListModel");
const User = require("../models/userModel");

exports.addNewFriendsList = async (req, res) => {
  const userId = req.user._id;

  try {
    const newFriendsList = await new FriendsList(req.body).save();

    await User.update(
      { _id: userId },
      { $push: { friendsListIds: newFriendsList._id } }
    );

    res.json({
      message: `FriendsList:${newFriendsList._id} created successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.getMyFriendsLists = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) throw new Error("User not found");

    const lists = await FriendsList.aggregate([
      { $match: { _id: { $in: user.friendsListIds } } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $project: {
          "users._id": 1,
          "users.name": 1,
          "users.image": 1,
        },
      },
    ]);

    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.getFriendsListById = async (req, res) => {
  const listId = req.params.id;

  try {
    const list = await FriendsList.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(listId) } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $project: {
          "users._id": 1,
          "users.name": 1,
          "users.image": 1,
        },
      },
    ]);

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.getFriendsListsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) throw new Error("User not found");

    const lists = await FriendsList.aggregate([
      { $match: { _id: { $in: user.friendsListIds } } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $project: {
          "users._id": 1,
          "users.name": 1,
          "users.image": 1,
        },
      },
    ]);

    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

// TODO: need to modify
exports.editFriendsList = async (req, res) => {
  const userId = req.user._id;
  const listId = req.params.id;

  try {
    const friendsList = await FriendsList.findOne({ _id: listId, userId });
    if (!friendsList) throw new Error("FriendsList not found");

    await FriendsList.update(
      { _id: listId },
      {
        $set: { title: req.body.title ? req.body.title : friendsList.title },
        $push: { friends: req.body.friends },
      }
    );

    res.json({ message: `FriendsList:${listId} updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

// TODO: need to modify
exports.deleteFriendsList = async (req, res) => {
  const userId = req.user._id;
  const listId = req.params.id;

  try {
    const friendsList = await FriendsList.findOne({ _id: listId, userId });
    if (!friendsList) throw new Error("FriendsList not found");

    await friendsList.deleteOne();

    res.json({ message: `FriendsList:${listId} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

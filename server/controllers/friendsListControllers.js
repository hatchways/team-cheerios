const mongoose = require("mongoose");

const FriendsList = require("../models/friendsListModel");
const User = require("../models/userModel");

exports.addNewFriendsList = async (req, res) => {
  const userId = req.user._id;

  try {
    if (req.body.title === "") throw new Error("Title must not empty");
    const newFriendsList = await new FriendsList({
      userId,
      ...req.body,
    }).save();

    res.json({
      message: `FriendsList:${newFriendsList._id} created successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
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

exports.getMyFriendsLists = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) throw new Error("User not found");

    const lists = await FriendsList.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      lookup,
      project,
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
      lookup,
      project,
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
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      lookup,
      project,
    ]);

    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.editFriendsList = async (req, res) => {
  const userId = req.user._id;
  const listId = req.params.id;
  const { title: newTitle, users: newUsers } = req.body;

  try {
    const friendsList = await FriendsList.findOne({ _id: listId, userId });
    if (!friendsList) throw new Error("FriendsList not found");

    const title = newTitle && newTitle !== "" ? newTitle : friendsList.title;

    let users = [...newUsers];
    if (newUsers && newUsers.length !== 0) {
      users = newUsers.filter((user) => !friendsList.users.includes(user));
    }

    await FriendsList.update(
      { _id: listId },
      {
        $set: { title },
        $push: { users },
      }
    );

    res.json({ message: `FriendsList:${listId} updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

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

exports.deleteAll = async () => {
  await FriendsList.deleteMany();
};

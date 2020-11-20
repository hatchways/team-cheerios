const FriendsList = require("../models/friendsListModel");
const { User } = require("../models/userModel");

exports.addNewFriendsList = async (req, res) => {
  const userId = req.user._id;
  const newFriendsList = new FriendsList({
    userId,
    ...req.body,
  });

  await newFriendsList.save((err, FriendsList) => {
    if (err) {
      res.send(err);
    }
    res.json(FriendsList);
  });
};

exports.getMyFriendsLists = async (req, res) => {
  const userId = req.user._id;

  try {
    const myLists = await FriendsList.find({ userId });
    if (myLists.length === 0) throw new Error("No Friends List Found");

    res.json(myLists);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.getFriendsListById = async (req, res) => {
  const listId = req.params.id;

  try {
    const list = await FriendsList.findById({ _id: listId });
    if (!list) throw new Error("No Friends List Found");

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
    if (!user) throw new Error("User not Found");

    const lists = await FriendsList.find({ userId });
    if (lists.length === 0) throw new Error("No Friends List Found");

    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.editFriendsList = async (req, res) => {
  const userId = req.user._id;
  const listId = req.params.id;

  try {
    const friendsList = await FriendsList.findOne({ _id: listId, userId });
    if (!friendsList) throw new Error("FriendsList not found");

    await FriendsList.update(
      { _id: listIdd },
      {
        $set: { title: req.body.title },
        $push: { friends: req.body.friends },
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

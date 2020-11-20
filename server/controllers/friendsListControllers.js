const FriendsList = require("../models/friendsListModel");

exports.addNewFriendsList = (req, res) => {
  const userId = req.user._id;
  const newFriendList = new FriendsList({
    userId,
    ...req.body,
  });

  newFriendList.save((err, FriendsList) => {
    if (err) {
      res.send(err);
    }
    res.json(FriendsList);
  });
};

exports.getMyFriendsList = async (req, res) => {
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

exports.editFriendsList = async (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;

  try {
    const friendsList = await FriendsList.findOne({ _id: id, userId });
    if (!friendsList) throw new Error("FriendsList not found");

    await FriendsList.update(
      { _id: id },
      {
        $set: { title: req.body.title },
        $push: { friends: req.body.friends },
      }
    );

    res.json({ message: `FriendsList:${id} updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

exports.deleteFriendsList = async (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;

  try {
    const friendsList = await FriendsList.findOne({ _id: id, userId });
    if (!friendsList) throw new Error("FriendsList not found");

    await friendsList.deleteOne();

    res.json({ message: `FriendsList:${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(404).json(err.toString());
  }
};

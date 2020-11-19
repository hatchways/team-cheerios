const FriendsList = require("../models/friendsListModel");

exports.addNewFriendsList = (req, res) => {
  const newFriendList = new FriendsList(req.body);

  newFriendList.save((err, FriendsList) => {
    if (err) {
      res.send(err);
    }
    res.json(FriendsList);
  });
};

exports.getFriendList = (req, res) => {
  FriendsList.find({}, (err, FriendsList) => {
    if (err) {
      res.send(err);
    }
    res.json(FriendsList);
  });
};

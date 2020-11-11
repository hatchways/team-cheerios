const Friend = require('../models/friendsListModel');

exports.addNewFriendsList = (req, res) => {
    let newFriendList = new Friend(req.body);

    newFriendList.save((err, Friend) => {
        if (err) {
            res.send(err);
        }
        res.json(Friend);
    });
};

exports.getFriendList = (req, res) => {
    Friend.find({},(err, Friend) => {
        if (err) {
            res.send(err);
        }
        res.json(Friend);
    });
};







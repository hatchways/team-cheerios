const express = require("express");
const router = express.Router();

const {
  addNewFriendsList,
  getFriendsList,
} = require("../controllers/friendsListControllers");

getFriendsList;
router.get("/friendsList", getFriendsList);
router.post("/friendsList", addNewFriendsList);

module.exports = router;

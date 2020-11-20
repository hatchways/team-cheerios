const express = require("express");
const {
  getFriendsListById,
  getFriendsListsByUser,
  addNewFriendsList,
  getMyFriendsLists,
  editFriendsList,
  deleteFriendsList,
} = require("../controllers/friendsListControllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:id", getFriendsListById);
router.get("/user/:userId", getFriendsListsByUser);
router.get("/", auth, getMyFriendsLists);
router.post("/", auth, addNewFriendsList);
router.put("/:id", auth, editFriendsList);
router.delete("/:id", auth, deleteFriendsList);

module.exports = router;

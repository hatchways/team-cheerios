const express = require("express");
const {
  addNewFriendsList,
  getMyFriendsList,
  editFriendsList,
  deleteFriendsList,
} = require("../controllers/friendsListControllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getMyFriendsList);
router.post("/", auth, addNewFriendsList);
router.post("/:id", auth, editFriendsList);
router.delete("/:id", auth, deleteFriendsList);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  changeProfilePicture,
  getFriendsInfo,
  getOpinions,
} = require("../controllers/userControllers");

router.put("/change-picture", auth, changeProfilePicture);
router.get("/getFriendsInfo", auth, getFriendsInfo);
router.get("/opinions", auth, getOpinions);

module.exports = router;

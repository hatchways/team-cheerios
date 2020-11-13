const { Router } = require("express");
const {
  getYourFollowers,
  getYourFollowings,
  followFriend,
  unfollowFriend,
} = require("../controllers/friendsControllers");

const router = Router();

router.get("/followers", getYourFollowers);
router.get("/followings", getYourFollowings);
router.post("/follow", followFriend);
router.post("/unfollow", unfollowFriend);

module.exports = router;

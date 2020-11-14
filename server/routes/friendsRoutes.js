const { Router } = require("express");
const {
  getSuggestedFriends,
  getYourFollowers,
  getYourFollowings,
  followFriend,
  unfollowFriend,
  deleteFriends,
} = require("../controllers/friendsControllers");

const router = Router();

router.get("/", getSuggestedFriends);
router.get("/followers", getYourFollowers);
router.get("/followings", getYourFollowings);
router.post("/follow", followFriend);
router.post("/unfollow", unfollowFriend);
router.delete("/", deleteFriends);

module.exports = router;

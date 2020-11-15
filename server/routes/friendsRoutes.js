const { Router } = require("express");
const {
  getSuggestedFriends,
  getYourFollowers,
  getYourFollowings,
  followFriend,
  unfollowFriend,
  deleteFriends,
  acceptRequest,
} = require("../controllers/friendsControllers");

const router = Router();

router.get("/", getSuggestedFriends);
router.get("/followers", getYourFollowers);
router.get("/followings", getYourFollowings);
router.post("/follow/:userId", followFriend);
router.post("/unfollow/:userIid", unfollowFriend);
router.post("/accept/:userId", acceptRequest);
router.delete("/", deleteFriends);

module.exports = router;

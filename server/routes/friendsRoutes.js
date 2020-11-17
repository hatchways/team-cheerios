const { Router } = require("express");
const auth = require("../middleware/auth");
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

router.get("/", auth, getSuggestedFriends);
router.get("/followers", auth, getYourFollowers);
router.get("/followings", auth, getYourFollowings);
router.post("/follow/:friendId", auth, followFriend);
router.post("/unfollow/:friendId", auth, unfollowFriend);
router.post("/accept/:friendId", auth, acceptRequest);
router.delete("/:userId", auth, deleteFriends);

module.exports = router;

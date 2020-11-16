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

// TODO: remove userId (except delete)
router.get("/:userId", getSuggestedFriends);
router.get("/followers/:userId", getYourFollowers);
router.get("/followings/:userId", getYourFollowings);
router.post("/follow/:userId/:friendId", followFriend);
router.post("/unfollow/:userId/:friendId", unfollowFriend);
router.post("/accept/:userId/:friendId", acceptRequest);
router.delete("/:userId", deleteFriends);

module.exports = router;

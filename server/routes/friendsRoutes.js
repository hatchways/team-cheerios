const { Router } = require("express");
const {
  getYourFollowers,
  getYourFollowings,
} = require("../controllers/friendsControllers");

const router = Router();

router.get("/followers", getYourFollowers);
router.get("/followings", getYourFollowings);

module.exports = router;

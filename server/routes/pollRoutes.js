const express = require("express");
const {
  getPollByID,
  getPollsByUser,
  getMyPolls,
  createNewPoll,
  updatePoll,
  deletePoll,
  getMyPollsWithData,
  getInvitedPolls,
} = require("../controllers/pollControllers");
const {
  voteMyChoice,
  changeMyChoice,
} = require("../controllers/voteControllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:id", getPollByID);
router.get("/user/:userId", getPollsByUser);
router.get("/", auth, getMyPolls);
router.post("/", auth, createNewPoll);
router.put("/:id", auth, updatePoll);
router.delete("/:id", auth, deletePoll);
router.get("/me/data", auth, getMyPollsWithData);
router.get("/me/invited",auth , getInvitedPolls);

router.post("/:pollId/vote/:choice", auth, voteMyChoice);
router.post("/:pollId/change/:choice", auth, changeMyChoice);

module.exports = router;

const express = require("express");
const {
  getPollByID,
  getPollsByUser,
  getMyPolls,
  createNewPoll,
  updatePoll,
  deletePoll,
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

router.post("/:pollId/vote/:choice", auth, voteMyChoice);
router.post("/:pollId/change/:choice", auth, changeMyChoice);

module.exports = router;

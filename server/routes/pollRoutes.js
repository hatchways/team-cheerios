const express = require("express");
const {
  getPollByID,
  getPollsByUser,
  getMyPolls,
  createNewPoll,
  updatePoll,
  deletePoll,
} = require("../controllers/pollControllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:id", getPollByID);
router.get("/user/:userId", getPollsByUser);
router.get("/", auth, getMyPolls);
router.post("/", auth, createNewPoll);
router.put("/:id", auth, updatePoll);
router.delete("/:id", auth, deletePoll);

module.exports = router;

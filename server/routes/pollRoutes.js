const express = require("express");
const router = express.Router();

const { 
    addNewPoll, 
    getPoll,
    getPollWithID,
    UpdatePoll,
    deletePoll
} = require('../controllers/pollControllers');

router.get("/polls", getPoll);
router.post("/polls", addNewPoll);

router.get("/poll/:pollId", getPollWithID);
router.put("/poll/:pollId", UpdatePoll);
router.delete("/poll/:pollId", deletePoll);


module.exports = router;
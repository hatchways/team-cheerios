const express = require("express");
const router = express.Router();

const { 
    addNewPoll, 
    getPoll,
    getPollWithID,
    UpdatePoll,
    deletePoll
} = require('../controllers/pollControllers');

const { 
    addNewVote,
    getVotes
} = require('../controllers/votesControllers');

router.get("/polls", getPoll);
router.post("/polls", addNewPoll);

router.get("/polls/vote", getVotes);
router.get("/polls/vote", addNewVote);



router.get("/polls/:id", getPollWithID);
router.put("/polls/:id", UpdatePoll);
router.delete("/polls/:id", deletePoll);


module.exports = router;
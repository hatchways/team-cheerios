const express = require("express");
const router = express.Router();


const { 
    addNewFriendsList, 
    getFriendList,
} = require('../controllers/friendsListControllers');



    getFriendList
    router.get("/friendsList", getFriendList);
    router.post("/friendsList", addNewFriendsList);

module.exports = router;

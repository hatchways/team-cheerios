const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const {changeProfilePicture, getFriendsInfo} = require("../controllers/userControllers")

router.put('/change-picture', auth, changeProfilePicture);
router.get('/getFriendsInfo',auth , getFriendsInfo)
module.exports = router;


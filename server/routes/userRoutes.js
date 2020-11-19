//to change user picture
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const {changeProfilePicture} = require("../controllers/userControllers")

router.put('/change-picture', auth, changeProfilePicture);

module.exports = router;


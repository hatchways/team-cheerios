const express = require("express");
const router = express.Router();



router.get("/ping",(req,res)=>{
    res.json("Testing...");
});


module.exports = router;


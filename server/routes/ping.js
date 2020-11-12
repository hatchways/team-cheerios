const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.post("/", function(req, res, next) {
  const teamName = req.body.teamName;
// console.log(process.env.TEAM_MEMBERS)
  if (
    teamName &&
    process.env.TEAM_MEMBERS &&
    process.env.TEAM_MEMBERS.indexOf(teamName) >= 0
  )
    res.status(200).send({ response: `${teamName} is part of the team!` });
  else
    res.status(400).send({
      response: `${teamName} is not part of the team. Modify your .env`
    });
});

module.exports = router;

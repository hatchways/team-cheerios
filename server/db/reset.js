const userControllers = require("../controllers/userControllers");
const friendsControllers = require("../controllers/friendsControllers");
const friendsListControllers = require("../controllers/friendsListControllers");
const pollControllers = require("../controllers/pollControllers");
const voteControllers = require("../controllers/voteControllers");

export const resetDB = async () => {
  await userControllers.deleteAll();
  await friendsControllers.deleteAll();
  await friendsListControllers.deleteAll();
  await pollControllers.deleteAll();
  await voteControllers.deleteAll();
};

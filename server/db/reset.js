const userControllers = require("../controllers/userControllers");
const friendsControllers = require("../controllers/friendsControllers");
const friendsListControllers = require("../controllers/friendsListControllers");
const pollControllers = require("../controllers/pollControllers");
const voteControllers = require("../controllers/voteControllers");

exports.reset = async () => {
  const delUser = await userControllers.deleteAll();
  const delFriends = await friendsControllers.deleteAll();
  const delFriendsLists = await friendsListControllers.deleteAll();
  const delPolls = await pollControllers.deleteAll();
  const delVotes = await voteControllers.deleteAll();

  return {
    delUser,
    delFriends,
    delFriends,
    delFriendsLists,
    delPolls,
    delVotes,
  };
};

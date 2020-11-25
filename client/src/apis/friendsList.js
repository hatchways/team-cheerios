import axios from "axios";

export const getMyFriendsLists = () =>
  axios
    .get("/friends-list")
    .then((res) => res.data)
    .catch((err) => console.error(err));

export const createNewFriendsList = (title,users) =>
  axios
    .post("/friends-list", {title , users})
    .catch((err) => console.log(err));
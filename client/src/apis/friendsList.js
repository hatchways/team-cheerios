import axios from "axios";

export const getMyFriendsLists = () =>
  axios
    .get("/friends-list")
    .then((res) => res.data)
    .catch((err) => console.error(err));

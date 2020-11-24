import axios from "axios";

export const getFriends = (url, index) =>
  axios
    .get(url)
    .then((res) => {
      switch (index) {
        case 1:
          let received = [...res.data?.received];
          let followers = [...res.data?.followers];

          received.map((user) => (user.status = "received"));
          followers.map((user) => (user.status = "follower"));

          return received.concat(followers);

        case 2:
          let sent = [...res.data?.sent];
          let followings = [...res.data?.followings];

          sent.map((user) => (user.status = "sent"));
          followings.map((user) => (user.status = "following"));

          return sent.concat(followings);

        default:
          return res.data?.friends;
      }
    })
    .catch((error) => console.error(error));

export const getFollowings = () =>
  axios
    .get("/friends/followings")
    .then((res) => res.data?.followings)
    .catch((error) => console.error(error));

export const followFriend = (id) =>
  axios.post(`friends/follow/${id}`).catch((error) => console.error(error));

export const unfollowFriend = (id) =>
  axios.post(`friends/unfollow/${id}`).catch((error) => console.error(error));

export const acceptRequest = (id) =>
  axios.post(`friends/accept/${id}`).catch((error) => console.error(error));

export const ignoreRequest = (id) =>
  axios.post(`friends/ignore/${id}`).catch((error) => console.error(error));

export const cancelRequest = (id) =>
  axios.post(`friends/cancel/${id}`).catch((error) => console.error(error));

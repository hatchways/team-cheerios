import axios from "axios";

import uploadtoS3 from "../utils/uploadtoS3";

export const createNewPoll = (files, newPoll) =>
  uploadtoS3(files)
    .then((imageUrls) =>
      axios
        .post("/poll", { images: imageUrls, ...newPoll })
        .then((res) => res.data)
    )
    .catch((err) => console.error(err));

export const editPoll = (pollId, updatingData) =>
  axios
    .put(`/poll/${pollId}`, updatingData)
    .then((res) => res.data)
    .catch((err) => console.error(err));

export const getPolls = () =>
  axios
    .get("/poll")
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const getPollById = (pollId) =>
  axios
    .get(`/poll/${pollId}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));

const VOTED_MSG = "You already voted";
const SAME_VOTE_MSG = "You already vote for that choice";

export const voteForPoll = (pollId, choice) =>
  axios
    .post(`/poll/${pollId}/vote/${choice}`)
    .then((res) => {
      if (res.data.message === VOTED_MSG) return false;
      return true;
    })
    .catch((err) => console.error(err));

export const changeYourVote = (pollId, choice) =>
  axios
    .post(`/poll/${pollId}/change/${choice}`)
    .then((res) => {
      if (res.data.message === SAME_VOTE_MSG) return false;
      return true;
    })
    .catch((err) => console.error(err));

export const deletePoll = (pollId) =>
  axios
    .delete(`/poll/${pollId}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));

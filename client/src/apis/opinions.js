import axios from "axios";

const NO_POLLS_MSG = "No Polls Found";

export const getOpinions = () =>
  axios
    .get("/opinions")
    .then((res) => {
      if (res.data.message === NO_POLLS_MSG) return false;
      return res.data;
    })
    .catch((err) => console.error(err));

import axios from "axios";

import uploadtoS3 from "../utils/uploadtoS3";

const BASE_URL = "/poll";

export const createNewPoll = (files, newPoll) =>
  uploadtoS3(files)
    .then((imageUrls) =>
      axios
        .post(BASE_URL, { images: imageUrls, ...newPoll })
        .then((res) => res.data)
    )
    .catch((err) => console.error(err));

export const getPolls = () =>
  axios
    .get("/poll")
    .then((res) => res.data)
    .catch((err) => console.log(err));

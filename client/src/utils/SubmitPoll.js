import axios from "axios";
import uploadtoS3 from "./uploadtoS3";

const pollUrl = "http://localhost:3001/polls";

const SubmitPoll = (files, question, selectedOption) => {
  uploadtoS3(files).then((urls) => {
    return axios.post(pollUrl, {
      question: question,
      images: urls,
      //using a temp id for now
      friendList: "562b2649b2e70464f113c04e",
    });
  });
};

export default SubmitPoll;

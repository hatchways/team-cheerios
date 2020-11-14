import axios from "axios";

const imageUrl = "http://localhost:3001/upload";
const pollUrl = "http://localhost:3001/polls";

const imageUrls = (files) => {
  return axios.post(imageUrl, files).then((response) => {
    return response.data.locationArray;
  });
};

const SubmitPoll = (files, question, selectedOption) => {
  imageUrls(files).then((urls) => {
    return axios.post(pollUrl, {
      question: question,
      images: urls,
      //using a temp id for now
      friendList: "562b2649b2e70464f113c04e",
    });
  });
};

export default SubmitPoll;

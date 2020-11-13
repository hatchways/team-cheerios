import axios from "axios";

const imageUrl = "http://localhost:3001/upload";
const pollUrl = "http://localhost:3001/polls";
const SubmitPoll = (files, question, selectedOption) => {
  axios.post(imageUrl, files).then((response) => {
    const newPoll = {
      question: question,
      images: response.data.locationArray,
      friendList: selectedOption,
    };

    return newPoll;
    //TODO: Submit Poll when friendList has necessary parameters
  });
};

export default SubmitPoll;

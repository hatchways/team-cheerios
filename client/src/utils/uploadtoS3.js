import axios from 'axios';
const imageUrl = "/upload";

const uploadtoS3 = (files) => {
  return axios.post(imageUrl, files).then((response) => {
    return response.data.locationArray; //return URL(s)
  });
};

export default uploadtoS3;

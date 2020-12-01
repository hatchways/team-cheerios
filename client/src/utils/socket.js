import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_ENDPOINT, {
  extraHeaders: {
    "x-auth-token": localStorage.HatchwayToken,
  },
});

export default socket;

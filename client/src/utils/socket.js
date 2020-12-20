import io from "socket.io-client";

const socket = io({
  extraHeaders: {
    "x-auth-token": localStorage.HatchwayToken,
  },
});

export const socketWithToken = (token) =>
  io({
    extraHeaders: {
      "x-auth-token": token,
    },
  });

export default socket;

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("socket id", socket.id);

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};

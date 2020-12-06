const jwt = require("jsonwebtoken");

const { addOnlineUser, removeOfflineUser, getOnlineUsers } = require("./user");

module.exports = function (io) {
  io.use((socket, next) => {
    const token = socket.handshake.headers["x-auth-token"];

    jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
      if (err) return next(new Error("Authentication error"));

      socket.userId = decoded._id;
      next();
    });
  }).on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("log in", (userId) => {
      if (socket.userId === userId) addOnlineUser(socket.id, userId);

      const onlineUsers = getOnlineUsers();
      io.emit("online users", onlineUsers);
    });

    socket.on("log out", (userId) => {
      if (socket.userId === userId) removeOfflineUser(socket.id, userId);

      const onlineUsers = getOnlineUsers();
      io.emit("online users", onlineUsers);
    });

    socket.on("disconnect", () => {
      removeOfflineUser(socket.id, socket.userId);
      console.log(`${socket.id} disconnected`);
    });
  });
};

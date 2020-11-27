const jwt = require("jsonwebtoken");

const { addOnlineUser, removeOfflineUser } = require("./user");

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

    socket.on("login", () => {
      const added = addOnlineUser(socket.id, socket.userId);
      if (!added) new Error("Login failed");
    });

    socket.on("logout", () => {
      const removed = removeOfflineUser(socket.userId);
      if (!removed) new Error("Logout failed");
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
    });
  });
};

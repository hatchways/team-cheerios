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
    console.log("socket connected");

    socket.on("login", () => {
      const res = addOnlineUser(socket.id, socket.userId);

      if (!res) new Error("Login failed");
    });

    socket.on("logout", () => {
      const res = removeOfflineUser(socket.userId);
      if (!res) new Error("Logout failed");

      console.log("socket disconnected");
    });
  });
};

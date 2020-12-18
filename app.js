const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const auth = require("./routes/auth");
const friendsListRouter = require("./routes/friendsListRoutes");
const friendsRouter = require("./routes/friendsRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const pollRouter = require("./routes/pollRoutes");
const uploadRouter = require("./routes/upload");
const userRouter = require("./routes/userRoutes");
const users = require("./routes/users");
require("./connect");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client","build")));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", userRouter);
app.use("/", uploadRouter);
app.use("/poll", pollRouter);
app.use("/friends-list", friendsListRouter);
app.use("/friends", friendsRouter);
app.use("/notification", notificationRouter);
app.use(cors());

app.get("*", (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});


module.exports = app;

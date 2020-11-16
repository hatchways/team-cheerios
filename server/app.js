const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const winston = require("winston");
const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const pollRouter = require("./routes/pollRoutes");
const friendsListRouter = require("./routes/friendsListRoutes");
const uploadRouter = require("./routes/upload")
const users = require("./routes/users");
const auth = require("./routes/auth");
const connect = require("./connect");
const cors = require("cors");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/api/users", users);
app.use("/api/auth", auth);

app.use("/",uploadRouter);
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/", pollRouter);
app.use("/", friendsListRouter);

app.use(cors());

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

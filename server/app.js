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
const uploadRouter = require("./routes/upload");
const mongoose = require("mongoose");
const cors = require("cors");

const { json, urlencoded } = express;

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", uploadRouter);
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/", pollRouter);
app.use("/", friendsListRouter);

// mongo connection
const uri = process.env.ATLAS_URI;
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connected");
});

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

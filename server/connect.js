const mongoose = require("mongoose");

// mongo connection

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

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

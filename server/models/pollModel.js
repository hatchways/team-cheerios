const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PollSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      ref: "imageSchema",
    },
  ],
  friendsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendsList",
    },
  ],
  numOfVotes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Poll", PollSchema);

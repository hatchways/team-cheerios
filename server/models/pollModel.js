const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PollSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
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
  friendsListId: {
    type: Schema.Types.ObjectId,
    ref: "FriendsList",
  },
  numOfVote1: {
    type: Number,
    default: 0,
  },
  numOfVote2: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Poll", PollSchema);

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
  friendsListId: {
    type: Schema.Types.ObjectId,
    ref: "FriendsList",
  },
  votes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vote",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Poll", PollSchema);

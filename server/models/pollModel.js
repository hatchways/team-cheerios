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
  voteIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vote",
    },
  ],
});

module.exports = mongoose.model("Poll", PollSchema);

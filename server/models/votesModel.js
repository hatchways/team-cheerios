const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pollId: {
      type: Schema.Types.ObjectId,
      ref: "Poll",
    },
    votedFor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);

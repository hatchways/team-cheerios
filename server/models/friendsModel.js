const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  followers: [
    {
      _id: false,
      friendId: Schema.Types.ObjectId,
      name: String,
      image: String,
      status: String,
    },
  ],
  followings: [
    {
      _id: false,
      friendId: Schema.Types.ObjectId,
      name: String,
      image: String,
      status: String,
    },
  ],
});

module.exports = mongoose.model("Friends", friendsSchema);

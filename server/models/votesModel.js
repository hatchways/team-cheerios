const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const votesSchema = new Schema({
    poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pollModel"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
});


module.exports = mongoose.model("Votes", votesSchema);
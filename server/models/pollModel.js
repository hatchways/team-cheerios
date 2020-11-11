const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PollSchema = new Schema({
    question: {
        type: String,
        required: true, 
      },
      images: [
        {
          type: String,
          ref: "imageSchema"
        } 
      ],
      friendList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userModel"
        } 
      ],
    });

    module.exports = mongoose.model('Poll', PollSchema );

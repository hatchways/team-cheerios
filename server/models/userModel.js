const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   lowercase: true,
    //   unique: true,
    // },
    // password: {
    //   type: String,
    //   minlength: 6,
    //   required: true,  
    // },
  },
);

module.exports = mongoose.model('User', userSchema);
const { string } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      maxlength: 256,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Will serve a flag as a hard delete on the database
    // Once updated never gonna be updated twice
    isDeleted: {
      type: Boolean,
      default: false,
    },
  })
);

exports.User = User;

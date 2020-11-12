const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Joi = require("joi");
const dotenv = require("dotenv");
dotenv.config();
const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

//To get the current user detail
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
// To register new user
router.post('/', async (req, res) => {
  const validation_error = validate_request(req)
  if(validation_error.error){
    res.status(400).send(validation_error.error.details[0].message);
    return;
  }

  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send('User already registered');
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  if (process.env.jwtPrivateKey) {
    const token = jwt.sign({_id: user._id}, process.env.jwtPrivateKey);
    res.header('x-auth-token', token).status(201).send(user);
  }
});


/* Input validation for user registration */
const validate_request = (req) =>{
  const schema =Joi.object({
    name : Joi.string().min(3).max(50).required(),
    email : Joi.string().min(5).max(254).required().email(),
    password : Joi.string().min(8).max(1024).required(),
    isActive : Joi.boolean().default(true),
    isDeleted : Joi.boolean().default(false)
  })
  return schema.validate(req.body);
}



module.exports = router;

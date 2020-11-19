const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config(); 
const {User} = require('../models/userModel');
const Joi = require("joi");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/',async (req,res) => {
    const {error} = validate_request(req.body);
    if(error) return res.status(400).send(error);
    let user = await  User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(400).send('Invalid email or password.');
    }
    const token = jwt.sign({_id: user._id},process.env.jwtPrivateKey);
    res.send({user,token});
});

module.exports = router;

/* Input validation for user registration */
const validate_request = (req) =>{
    const schema =Joi.object({
      email : Joi.string().min(5).max(254).required().email(),
      password : Joi.string().min(8).max(1024).required()
    })
    return schema.validate(req.body);
  }

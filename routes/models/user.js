//const config = require("config");
//const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 25
  },

  isAdmin: Boolean
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(), //. email() to ensure it is a valid email
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(25)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;

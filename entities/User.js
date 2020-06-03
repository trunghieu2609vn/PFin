let mongoose = require('mongoose');
let validator = require('validator');
let userSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    fullName: String,
    userName: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    dateOfBirth: Date,
    email: {
      type: String,
      validate: (value) => {
        return validator.isEmail(value);
      }
    }, 
  });

module.exports = mongoose.model('User', userSchema)
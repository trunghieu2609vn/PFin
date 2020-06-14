let mongoose = require('mongoose');
let validator = require('validator');
let userSchema = new mongoose.Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
    firstName: String,
    lastName: String,
    fullName: String,
    userName: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    dateOfBirth: String,
    email: {
      type: String,
      validate: (value) => {
        return validator.isEmail(value);
      }
    }, 
    creDate: Date
  },{
    timestamps: {
      createdAt: "creDate",
    }
  });

module.exports = mongoose.model('User', userSchema)
let mongoose = require('mongoose');
let logSchema = new mongoose.Schema({
    error: String,
    serviceError: String,
    creDate: { type:Date, default:Date.now() },
    userID: String,
  });

module.exports = mongoose.model('Log', logSchema)
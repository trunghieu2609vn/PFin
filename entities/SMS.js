let mongoose = require('mongoose');
let validator = require('validator');
let smsSchema = new mongoose.Schema({
    bankCode: String,
    account: String, //Tài khoản
    changeType: Boolean,
    money: Number, //số tiền biến động
    blance: Number, //số dư
    message: String,
    time: String, //Thời gian thay đổi (tính đến ngày)
    content: String, //Nội dung toàn bộ tin nhắn
    creDate: { type:Date, default:Date.now },
    userID: String,
  });

module.exports = mongoose.model('SMS', smsSchema)
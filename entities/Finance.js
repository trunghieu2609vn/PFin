let mongoose = require('mongoose');
let validator = require('validator');

//Lưu thông tin chung hiện tại về tài chính đối với từng user, key chính là userID
let financeSchema = new mongoose.Schema({
    userID: String,
    blance: Number, //số tiền hiện tai
    lastTimeUpdate: { type:Date, default: Date.now }, //Thời ian cập nhật cuối cùng
    creDate: { type:Date, default: Date.now }
  });

module.exports = mongoose.model('Finance', financeSchema)
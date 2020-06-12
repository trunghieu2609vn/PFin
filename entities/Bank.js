let mongoose = require('mongoose');
//Lưu thông tin theo từng tài khoản ngân hàng theo từng user, key chính là userID
let bankSchema = new mongoose.Schema({
    userID: String,
    blance: Number, //số tiền hiện theo từng tài khoản
    accountNumber: String,
    bankCode: String,
    lastTimeUpdate: String, //Thời gian cập nhật cuối cùng
    creDate: { type:Date, default: Date.now },
  });

module.exports = mongoose.model('Bank', bankSchema)
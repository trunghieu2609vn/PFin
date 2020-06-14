let mongoose = require('mongoose');
let validator = require('validator');

//Lưu thông tin chung hiện tại về tài chính đối với từng user, key chính là userID
let financeSchema = new mongoose.Schema({
    userID: String,
    blance: Number, //số tiền hiện tai
    bankTotalBlance: Number,
    lastTimeUpdate: Date, //Thời gian cập nhật cuối cùng
    creDate: Date
  },{
    timestamps: {
      createdAt: "creDate",
      updatedAt: "lastTimeUpdate"
    }
  });

module.exports = mongoose.model('Finance', financeSchema)
let mongoose = require('mongoose');
let validator = require('validator');

//Lưu thông tin chung hiện tại về tài chính đối với từng user, key chính là userID
let financeSchema = new mongoose.Schema({
    userID: String,
    userName: {
      type: String,
      required: true,
    },
    blance: Number, //số tiền hiện tai
    blanceLimit: Number, //Giới hạn chi tiêu: nếu cập nhật về = 0 thì không tính giới hạn
    lastTimeUpdate: Date, //Thời gian cập nhật cuối cùng
    creDate: Date
  },{
    timestamps: {
      createdAt: "creDate",
      updatedAt: "lastTimeUpdate"
    }
  });

module.exports = mongoose.model('Finance', financeSchema)
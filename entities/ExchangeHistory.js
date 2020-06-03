let mongoose = require('mongoose');

let exchangeHistorySchema = new mongoose.Schema({
    userID: String, //ID user
    bankCode: String,
    changeType: Boolean, //false : out || true : in
    money: Number,
    time: Date, //Thời gian thay đổi
    smsID: String,
})

module.exports = mongoose.model('ExchangeHistory', exchangeHistorySchema);

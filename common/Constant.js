var PFin = PFin || {};

PFin.Constant = {
    SMSKey: {
        Account: "account",
        Money: "money", //Số tiền thay đổi
        Time: "time", //Thời gian thay đổi
        Minute: "min",
        Date: "date",
        Blance: "blance",
        Change_Type: "changeType",
        Message: "message" //Nội dung tin nhắn
    },
    ChangeType: {
        In: 1,
        Out: 0
    }
}

module.exports = PFin;
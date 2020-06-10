var PFin = PFin || {};

//Cấu hình object tin nhắn gửi từ client
PFin.SMSObject = {
    Content: "Content", //nội dung tin nhắn
    BankCode: "BankCode", //Mã ngân hàng
    IsNewest: "IsNewest" //Đánh dấu là tin nhắn mới nhất theo mỗi ngân hàng
}

//Cấu hình ngân hàng
PFin.BankMap = {
    BIDV: {
        code: "BIDV",
        phone: 2438,
        name: "Ngân hàng Đầu tư và Phát triển Việt Nam"
    },
    ACB: {
        code: "ACB",
        phone: 222,
        name: "Ngân hàng Thương mại cổ phần Á Châu"
    },
    TCB: {
        code: "TCB",
        phone: 0,
        name: "Ngân hàng TMCP Ngoại thương Việt Nam"
    }
}

//Cấu hình tin nhắn theo ngân hàng, theo vị trí index đã tính toán sẵn
PFin.SMSConfig = {
    BIDV : {
        account : 0,
        money_change : 3,
        time: {
            min: 5,
            date: 6
        },
        so_du: 8,
        content_key: "ND:" //key đánh dấu cắt nội dung, ký tự xuất hiện đầu tiên 
    },
    ACB : {
        account : 2,
        change_type: 3,
        money_change : 4,
        time: {
            min: 6,
            date: 7
        },
        so_du: 10,
        content_key: "GD:" //key đánh dấu cắt nội dung, ký tự xuất hiện đầu tiên 
    },
    VCB : {
        account : 2,
        money_change : 3,
        time: {
            min: 6,
            date: 5
        },
        so_du: 8,
        content_key: "Ref" //key đánh dấu cắt nội dung, ký tự xuất hiện đầu tiên 
    }
}

module.exports = PFin;
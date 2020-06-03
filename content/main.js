$(document).ready(function(){
    $("#btnSubmit").on("click", function(e){
        let smsDec = $("#txtInput").val(),
            bank = $("#cboBank").val();
            
        if(!smsDec) {
            alert("Bạn cần điền nội dung tin nhắn cần detect!");
            return false;
        }
        
        let params = {
            sms : smsDec,
            bankCode : bank
        };
        $.ajax({
            type: "POST",
            url: "/api/detect",
            data: JSON.stringify(params),
            dataType: "json",
            contentType: "application/json"
        }).done(function(res){
            let html = `
                <span> - <strong>Tên tài khoản</strong> : ${res["account"]}</span> </br> 
                <span> - <strong>Số tiền biến động</strong> : ${res["money_change"]}</span> </br> 
                <span> - <strong>Nội dung</strong> : ${res["noi_dung"]}</span> </br> 
                <span> - <strong>Loại biến động</strong> : ${res["change_type"]}</span> </br> 
                <span> - <strong>Số dư hiện tại</strong> : ${res["so_du"]}</span> </br> 
                <span> - <strong>Thời gian</strong> : ${res["min"]} ${res["date"]}</span> </br> 
            `;
            $("#txtValue").html(html);
        }).fail(function(err){
            alert("Đã có lỗi xảy ra trong quá trình detect ...");
        });
    });

    let smsDemo = ["TK21510001973146 tai BIDV -10,000VND vao 11:23 13/11/2018. So du:5,637,054.592VND. ND: Nap vi dien tu MoMo 01205786969", 
    "TK21510001973146 tai BIDV +5,650,000VND vao 11:06 13/11/2018. So du:5,657,454VND. ND: CTK NT", 
    "TK21510001973146 tai BIDV -8,800VND vao 10:14 25/08/2018. So du:7,451VND. ND: PHI DICH VU NHAN TIN TU DONG (BSMS) THANG 7.2018. MA KH8975403",
    "Tu ngay 04/07/19, de nang cao tinh bao mat, BIDV se de nghi KH doi mat khau (PIN) the 9704-9239 tai ATM BIDV. Lien he 19009247 de duoc ho tro",
    "Nhan dip Xuan Ky Hoi 2019, BIDV tran trong cam on Quy KH da dong hanh cung ngan hang suot thoi gian qua va kinh chuc Quy KH Suc khoe, An Khang, Thinh vuong."];
    $("#btnDemo").on("click", function(e){
        let rd = Math.floor(Math.random() * smsDemo.length);
        $("#txtInput").val(smsDemo[rd]);
    });

    //validate này sau này nhấc sang app sẽ là bước tiền đề để nhận dạng có phải là tin nhắn giao dịch không
    //Hiện tại đang áp dụng cho BIDV, sau này sẽ mở rộng thêm các ngân hàng khác
    var validateClient = (sms) => {
        let arr = sms.split(" ");

        //Không đủ số ký tự
        if(arr.length <= 10) return false;

        if(arr[0].lastIndexOf("TK") !== 0) return false; 

        //kiểm tra ngân hàng
        if(arr[2] != "BIDV") return false;

        var moneyChange = arr[3].substring("");
        if( !("+-".includes(moneyChange.substring(0,1)) && moneyChange.includes("VND"))) return false;

        return true;
    }
});
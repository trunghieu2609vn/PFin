const LogModel = require("../entities/Log");
var PFin = PFin || {};

PFinUtil = {
    
    /**
     * LẤy chuỗi số trong chuỗi
     * @param {*} str chuỗi đầu vào
     * @param {*} isArr đầu ra trả ra là dạng mảng không
     */
    getNumberInString(str, isArr){
        var regex = /[+-]?\d+(\.\d+)?/g;
        var number = str.match(regex).map(function(v) { return v; });
        return isArr === true ? number : number.join("");
    },

    /**
     * Lấy số tiền trong tin chuỗi string chuyển sang VND
     * @param {*} str 
     */ 
    getDecimalInString(str){
        var numArr = this.getNumberInString(str, true) || ["0"];
        return numArr.join(",") + " VND";
    },

    /**
     * Xử lý log lại lỗi
     * @param {*} err 
     * @param {*} req 
     */
    handlerLog(err, req){
        let logObj = {};
        if(req){
            logObj["serviceError"] = req.url;
        }
        logObj["error"] = err;
        LogModel.insertMany([logObj])
        console.log(err);
    }
}

module.exports = PFinUtil;
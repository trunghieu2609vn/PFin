const util = require('util');
var smsConfig = require('../common/sms_config');
var constant = require('../common/Constant');
var utilPfin = require('../common/util_pfin');

class Detect {
    constructor(arg){
    }
    
    /**
     * Phân tích tin nhắn các ngân hàng
     * @param sms tin nhắn đầu vào
     * @param bankCode mã ngân hàng đã được map 
     * DTHieu1
     */
    detectSMS (sms, bankCode){
        let me = this, 
            smsArr = sms.split(" "),//Tách tin nhắn theo dấu cách
            config = smsConfig.SMSConfig[bankCode], //lấy cấu hình tin nhắn
            key = constant.Constant.SMSKey;
        
        if( !sms || !bankCode){
            return {};
        }

        //Khởi tạo đối tượng
        let decObject = {
            bankCode: bankCode,
            content: sms
        };

        //Duyệt các phần tử đã tách
        smsArr.forEach((item, index) => {
            let tmp = null;
            switch(index) {
                case config.account:
                    tmp = key.Account;
                    break;
                case config.money_change:
                    tmp = key.Money;
                    item = utilPfin.getNumberInString(item);
                    break;
                case config.change_type:
                    decObject[key.Change_Type] = me.getChangType(item, bankCode);
                    break;
                case config.so_du:
                    tmp = key.Blance;
                    item = utilPfin.getNumberInString(item);
                    break;
                case config.time.min:
                    tmp = key.Minute;
                    break;
                case config.time.date:
                    tmp = key.Date;
                    break;
                case config.time.time:
                    //Cấu hình này sinh ra khi không lấy đươc riêng phút và date
                    tmp = key.Time;
                    break;
                default:
                    break;
            }
            if(tmp){
                decObject[tmp] = item;
            }
        });

        //Trường hợp một số ngân hàng không tách riêng được thay đổi
        //Bởi loại thay đổi dính liền cùng số tiền
        if (decObject[key.Change_Type] === undefined) {
            let moneyChange = smsArr[config.money_change];
            decObject[key.Change_Type] = me.getChangType(moneyChange.substring(0,1), bankCode);
        }

        //Lấy nội dung tin nhắn
        let contentKey = config.content_key;
        if(contentKey){
            decObject[key.Message] = sms.substring(sms.indexOf(contentKey) + contentKey.length );
        }

        //Lấy thời gian, nếu lấy được theo time thì bỏ qua
        if(decObject[key.Time] === undefined && decObject[key.Minute] && decObject[key.Date]){
            decObject[key.Time] = decObject[key.Minute] + " " + decObject[key.Date];
        }
        
        let a = key.time.time;

        //Tạm fix theo UserID
        decObject["userID"] = "dthieu1302";

        return decObject;
    }

    /**
     * LẤy thông tin dạng thay đổi của tin nhắn
     * @param {*} item item
     * @param {*} bankCode mã ngân hàng
     */
    getChangType(item, bankCode){
        return item === '-' ? constant.Constant.ChangeType.Out : constant.Constant.ChangeType.In;
    }

    /**
     * Phân tích danh sách tin nhắn
     * @param {*} smsList 
     */
    detectList(smsList){
        let me = this,
            cfig = smsConfig.SMSObject,
            lstRes = [];
        if(Array.isArray(smsList)){
            for (let i = 0; i < smsList.length; i++) {
                let item = smsList[i],
                    result = me.detectSMS(item[cfig.Content], item[cfig.BankCode]);
                lstRes.push(result);
            }
            return lstRes;
        }
        return null;
    }
}
var detect = new Detect();
module.exports = detect;


// console.log(util.isNumber(-100));
// console.log(util.isNumber("dfdf"));
// console.log(util.isNumber("df69df"));
const util = require('util');
const mongodb = require('../base/dbbase');
const detect = require('../../business/detect');
const SMSModel = require('../../entities/SMS');
const utilPfin = require('../../common/util_pfin');
var _userid = "dthieu1302";

//mặc định theo userID
class SMSController {
    constructor(){
    }
    
    /**
     * Lấy toàn bộ tin nhắn theo người dùng
     * @param {*} req 
     * @param {*} res 
     */
    getAllSMS(req, res){
        let querry = SMSModel.find({userID: _userid});
        querry.exec((err, docs) => {
            if(err){
                console.log(err);
                return [];
            }
            res.json(docs);
        });
    }

    /**
     * Lấy tin nhắn theo ngân hàng
     * @param {*} req 
     * @param {*} res 
     */
    getSMSByBankCode(req, res){
        let bankCode = req.body.bankCode,
            querry = SMSModel.find({bankCode: bankCode, userID: _userid});
        querry.exec((err, docs) => {
            if(err){
                console.log(err);
                return [];
            }
            res.json(docs);
        });
    }

    /**
     * Lấy chi tiết tin nhắn theo id bản ghi
     * @param {*} req 
     * @param {*} res 
     */
    getSMSByID(req, res){
        let id = req.body.id;
        SMSModel.findById(id).exec((err, docs) => {
            if(err){
                console.log(err);
                return [];
            }
            res.json(docs);
        });
    }

    /**
     * api xử lý tin nhắn, thực hiện lưu vào db
     * @param {*} req 
     * @param {*} res 
     */
    detectSMS(req, res) {
        let smsList = req.body.sms;
        
        try {
            //Kiểm tra có phải là mảng không
            if(smsList && Array.isArray(smsList)){
                let lstValue = detect.detectList(smsList);
                if (lstValue !== null && lstValue.length > 0) {
                    //Thực hiện lưu vào db Todo
                    SMSModel.insertMany(lstValue).then((docs) => {
                        res.json(docs);
                    }).catch((err) => {
                        res.json([]);
                    })
                }
            }
        } catch (err) {
            utilPfin.handlerLog(err, req);
        }
        
    }

}

module.exports = new SMSController();
const util = require('util');
const detect = require('../../business/detect');
const SMSModel = require('../../entities/SMS');
const utilPfin = require('../../common/util_pfin');
const BankModel = require('../../entities/Bank');


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
        let userid = req.body.userID, 
            querry = SMSModel.find({userID: userid}).sort({creDate: "desc"});

        querry.exec((err, docs) => {
            if(err){
                utilPfin.handlerLog(err, req);
                docs = [];
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
            userid = req.body.userID,
            querry = SMSModel.find({bankCode: bankCode, userID: userid}).sort({creDate: "desc"});

        querry.exec((err, docs) => {
            if(err){
                utilPfin.handlerLog(err, req);
                docs = [];
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
                utilPfin.handlerLog(err, req);
                docs = [];
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
        let smsList = req.body.sms, 
            userID = req.body.userID;
        try {
            //Kiểm tra có phải là mảng không
            if(smsList && Array.isArray(smsList) && userID){
                let lstValue = detect.detectList(smsList, userID);
                if (lstValue !== null && lstValue.length > 0) {
                    //Thực hiện lưu vào db
                    SMSModel.insertMany(lstValue).then((docs) => {
                        res.json(docs);
                    }).catch((err) => {
                        utilPfin.handlerLog(err, req);
                        res.json([]);
                    });

                    //Xử lý tin danh sách tin nhắn lấy ra tin nhắn cuối cùng theo từng ngân hàng và cập nhật vào collection bank
                    lstValue.filter((item) => {
                        if(item["IsNewest"] === true){
                            BankModel.updateOne({userID : userID, bankCode: item["bankCode"]}, {
                                blance : item["blance"]
                            }, (err, raw) => {
                                utilPfin.handlerLog(("err : " + err + " || raw : " + raw), {url : "updateBank blance sms"});
                            });
                        }
                    });
                }
            }
        } catch (err) {
            utilPfin.handlerLog(err, req);
        }
    }

}

module.exports = new SMSController();
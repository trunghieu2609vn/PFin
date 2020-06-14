const util = require('util');
const BankModel = require('../../entities/Bank');
const utilPfin = require('../../common/util_pfin');

class BankController{
    constructor(){
    }

    /**
     * Lấy toàn bộ ngân hàng theo người dùng
     * @param {*} req 
     * @param {*} res 
     */
    getAllBank(req, res){
        let userid = req.body.userID,
            querry = BankModel.find({userID: userid}).sort({creDate: "desc"});
        querry.exec((err, docs) => {
            if(err){
                utilPfin.handlerLog(err, req);
                docs = [];
            }
            res.json(docs);
        });
    }

    /**
     * Thêm ngân hàng theo userID
     * @param {*} req 
     * @param {*} res 
     */
    insertBank(req, res){
        let bank = req.body.bank;
        if(bank && typeof bank === "object" && bank["userID"] && bank["bankCode"]){
            //Xử lý dữ liệu mặc định khi thêm mới ngân hàng
            bank["blance"] = Number(bank["blance"]) || 0;
            BankModel.insertMany([bank]).then((docs) => {
                res.json(docs);
            }).catch((err) => {
                utilPfin.handlerLog(err, req);
                res.json([]);
            });
        }else{
            res.json({message: "Thiếu tham số ..."});
        }
    }
    /**
     * Cập nhật thông tin ngân hàng
     * @param {*} req 
     * @param {*} res 
     */
    updateBank(req, res){
        let bank = req.body.bank,
            bankId = bank["_id"];
        if(bank && typeof bank === "object" && bankId){
            // delete bank["_id"];
            BankModel.updateOne({_id: bankId}, bank, (err, raw) => {
                if(err){
                    utilPfin.handlerLog(err, req);
                    res.json({message : "Đã có lỗi xảy ra."});
                    return false;
                }
                res.json({message : "Cập nhật thành công."});
            });
        }else{
            res.json({message: "Thiếu tham số ..."});
        }
    }

    /**
     * Xóa ngân hàng
     * @param {*} req 
     * @param {*} res 
     */
    deleteBank(req, res){
        let id = req.body.id;//ID bản ghi cần xóa
        if(id){
            BankModel.deleteOne({_id : id}).then((docs) => {
                res.json({message : "Xóa thành công!"});
            }).catch((err) => {
                utilPfin.handlerLog(err, req);
                res.json({message : "Xóa thất bại."});
            });
        }
    }
}

module.exports = new BankController();
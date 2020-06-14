const util = require('util');
const FinanceModel = require('../../entities/Finance');
const utilPfin = require('../../common/util_pfin');

/**
 * Thông tin tài chính riêng từng người dùng
 */
class FinanceController{
    constructor(){
    }

    /**
     * LẤy thông tin người dùng hiện tại đang đăng nhập theo username
     * @param {*} req 
     * @param {*} res 
     */
    getFinanceUser(req, res){
        let userName = req.body.userName;

        FinanceModel.findOne({userName: userName}).exec((err, doc) => {
            if(err){
                utilPfin.handlerLog(err, req);
                res.json({
                    error : {
                        message: "Có lỗi xảy ra",
                        err: err
                    }
                });
                return false;
            }
            res.json(doc);
        });
    }

    /**
     * Thêm, khởi tạo khi thêm người dùng, Thông tin tài chính người dùng
     * @param {*} req 
     * @param {*} res 
     */
    insertFinanceUser(req, res){
        let newFinance = req.body.finance;

        if(newFinance && typeof newFinance === "object" && newFinance["userName"]){
            newFinance["blance"] = Number(newFinance["blance"]) || 0;
            newFinance["blanceLimit"] = Number(newFinance["blanceLimit"]) || 0;

            FinanceModel.insertMany([newFinance]).then((docs) => {
                res.json(docs);
            }).catch((err) => {
                utilPfin.handlerLog(err, req);
                res.json([]);
            });

        }else{
            res.json({message: "Thiếu tham số hoặc định dạnh dữ liệu không đúng ..."});
        }
    }

    /**
     * Cập nhật tài chính người dùng
     * @param {*} req 
     * @param {*} res 
     */
    updateFinaneUser(req, res){
        let finance = req.body.finance;

        if(finance && typeof finance === "object" && finance["userName"]){
            
            FinanceModel.updateOne({userName: finance["userName"]}, finance, (err, raw) => {
                if(err){
                    utilPfin.handlerLog(err, req);
                    res.json({message : "Đã có lỗi xảy ra."});
                    return false;
                }
                res.json({message : "Cập nhật thành công."});
            });
        }else{
            res.json({message: "Thiếu tham số hoặc định dạnh dữ liệu không đúng ..."});
        }
    }
}

module.exports = new FinanceController();
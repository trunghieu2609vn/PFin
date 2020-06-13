const util = require('util');
const UserModel = require('../../entities/User');
const utilPfin = require('../../common/util_pfin');

class UserController{
    constructor(){
    }

    /**
     * LẤy thông tin người dùng theo username và password
     * @param {*} req 
     * @param {*} res 
     * 
     */
    getUserByUsernamePassword(req, res){
        let username = req.body.username,
            pass = req.body.password;
        UserModel.findOne({userName: username, password: pass}).exec((err, docs) => {
            if(err){
                utilPfin.handlerLog(err, req);
                docs = [];
            }
            res.json(docs);
        });
    }

    /**
     * Thêm user
     * @param {*} req 
     * @param {*} res 
     */
    insertUser(req, res){
        let user = req.body.user;
            
        if(user && typeof user === "object"){
            UserModel.insertMany([user]).then((docs) => {
                if(docs.length > 0){
                    res.json(docs[0]);
                }else{
                    res.json({
                        message: "Thêm người dùng không thành công",
                        code: 0
                    })
                }
            }).catch((err) => {
                utilPfin.handlerLog(err, req);
                let val = {
                    message: "Có lỗi xảy ra",
                    code: -1
                };

                if(err.code === 11000){
                    val = {
                        message : "Tên người dùng đã tồn tại",
                        code : 11000
                    };
                }

                res.json(val);
            });
        }else{
            utilPfin.handlerLog("user failed !", req);
        }
    }

    /**
     * Cập nhật người dùng theo username
     * @param {*} req 
     * @param {*} res 
     */
    updateUser(req, res){
        let user = req.body.user,
            username = user["userName"];

        //Kiểm tra định dạng dữ liệu gửi lên đúng chưa
        if(user && typeof user === "object" && username){

            UserModel.updateOne({userName: username}, user, (err, raw) => {
                let mes = "";
                if(err){
                    utilPfin.handlerLog(err, req);
                    mes = "Đã có lỗi xảy ra.";
                }else{
                    if(raw.nModified > 0){
                        mes = "Cập nhật thông tin thành công.";
                    }else{
                        mes = "Không có bản ghi nào được cập nhật."
                    }
                }
                res.json({message : mes});
            });
        }else{
            utilPfin.handlerLog("user failed !", req);
        }   
        
    }

    /**
     * Kiểm tra tài khoản đã tồn tại chưa
     * @param {*} req 
     * @param {*} res 
     */
    checkExitsUsername(req, res){
        let username = req.body.username,
            mes = "",
            code = 0; //-1 có lỗi  ||  0 : chưa tồn tại ||  1 : đã tồn tại

        UserModel.findOne({userName: username}).exec((err, docs) => {
            if(err){
                utilPfin.handlerLog(err, req);
                code = -1;
                mes = "Có lỗi xảy ra..."
                return true;
            }

            //Nếu có bản ghi thì trả về object
            if(docs){
                mes = "Tài khoản đã tồn tại";
                code = 1;
            }else{
                //không có trả docs = null
                mes = "Tài khoản hợp lệ!";
            }

            res.json({
                message: mes,
                code: code
            });
        });
    }
}


module.exports = new UserController();
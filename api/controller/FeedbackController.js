const FeedbackModel = require('../../entities/Feedback');
const utilPfin = require('../../common/util_pfin');

class FeedbackController{
    constructor(){

    }

    /**
     * Lấy toàn bộ nội dung phản hồi
     * @param {*} req 
     * @param {*} res 
     */
    getAllFeedback(req, res){
        FeedbackModel.find( (err, docs) => {
            if(err){
                utilPfin.handlerLog(err, req);
                res.json([]);
                return false;
            }
            res.json(docs);
        })
    }

    /**
     * Thêm phản hồi
     * @param {*} req 
     * @param {*} res 
     */
    insertFeedback(req, res){
        let feedback = req.body.feedback;
        if(feedback && typeof feedback === "object"){
            FeedbackModel.insertMany([feedback]).then(docs => {
                res.json(docs);
            }).catch(err => {
                utilPfin.handlerLog(err, req);
                res.json([]);
            })
        }
    }

}

module.exports = new FeedbackController();
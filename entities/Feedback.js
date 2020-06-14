let mongoose = require('mongoose');

let FeedbackSchema = new mongoose.Schema({
    userName: String,
    type: {
        type: Number,
        default: 0 // 0 : góp ý, 1 : lỗi
    }, 
    content: String,
    creDate: Date
  }, {
     timestamps: {
         createdAt: "creDate"
     } 
  });

module.exports = mongoose.model('Feedback', FeedbackSchema)
'use strict';
module.exports = function(app) {

    let smsController = require('./controller/SMSController');
    app.route('/sms/getallsms').get(smsController.getAllSMS);
    app.route('/sms/detectsms').post(smsController.detectSMS);
    app.route('/sms/getsmsbyid').post(smsController.getSMSByID);
    app.route('/sms/getsmsbybankcode').post(smsController.getSMSByBankCode);
    app.route('/sms/insertSMSList').post(smsController.insertSMSList);

    let bankController = require('./controller/BankController');
    app.route('/bank/getallbank').get(bankController.getAllBank);
    app.route('/bank/insertbank').post(bankController.insertBank);
    app.route('/bank/updatebank').post(bankController.updateBank);
    app.route('/bank/deletebank').post(bankController.deleteBank);
    

    let userController = require('./controller/UserController');
    app.route('/user/getUserByUsernamePassword').get(userController.getUserByUsernamePassword);
    app.route('/user/checkExitsUsername').get(userController.checkExitsUsername);
    app.route('/user/insertUser').post(userController.insertUser);
    app.route('/user/updateUser').post(userController.updateUser);

    let financeController = require('./controller/FinanceController');
    app.route('/finance/getFinanceUser').get(financeController.getFinanceUser);
    app.route('/finance/insertFinanceUser').post(financeController.insertFinanceUser);
    app.route('/finance/updateFinaneUser').post(financeController.updateFinaneUser);

    let feedbackController = require('./controller/FeedbackController');
    app.route('/feedback/getAllFeedback').get(feedbackController.getAllFeedback);
    app.route('/feedback/insertFeedback').post(feedbackController.insertFeedback);

};
'use strict';
module.exports = function(app) {

    let smsController = require('./controller/SMSController');
    app.route('/sms/getallsms').get(smsController.getAllSMS);
    app.route('/sms/detectsms').post(smsController.detectSMS);
    app.route('/sms/getsmsbyid').post(smsController.getSMSByID);
    app.route('/sms/getsmsbybankcode').post(smsController.getSMSByBankCode);

    let bankController = require('./controller/BankController');
    app.route('/bank/getallbank').get(bankController.getAllBank);
    app.route('/bank/insertbank').post(bankController.insertBank);
    app.route('/bank/updatebank').post(bankController.updateBank);
    app.route('/bank/deletebank').post(bankController.deleteBank);
    
};
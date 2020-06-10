'use strict';
module.exports = function(app) {

    let smsController = require('./controller/SMSController');
    app.route('/sms/getallsms').get(smsController.getAllSMS);
    app.route('/sms/detectsms').post(smsController.detectSMS);
    app.route('/sms/getsmsbyid').post(smsController.getSMSByID);
    app.route('/sms/getsmsbybankcode').post(smsController.getSMSByBankCode);

    let bankController = require('./controller/BankController');
    app.route('bank/getAllBank').get(bankController.getAllBank);
    app.route('bank/insertBank').post(bankController.insertBank);
    app.route('bank/updateBank').post(bankController.updateBank);
    app.route('bank/deleteBank').post(bankController.deleteBank);
    
};
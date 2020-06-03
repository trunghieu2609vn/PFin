'use strict';
module.exports = function(app) {

    let smsController = require('./controller/SMSController');
    app.route('/sms/getallsms').get(smsController.getAllSMS);
    app.route('/sms/detectsms').post(smsController.detectSMS);
    app.route('/sms/getsmsbyid').post(smsController.getSMSByID);
    app.route('/sms/getsmsbybankcode').post(smsController.getSMSByBankCode);
};
// const http = require('http');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const express = require('express');
// var app = express();
// var port = 1302;
// var urlencodedParser = bodyParser.urlencoded({extended: false});
// var jsonParser = bodyParser.json();

// //dthieu
// //Cho phép truy cập đến các file trong content
// app.use("/assets", express.static(__dirname + '/content'));
// //Khai báo view 
// app.set("view engine", "ejs");

// //Tạo server
// app.listen(port, "127.0.0.1", function(){
//     console.log("Server listioning on: http://localhost:1302");
// });

// //Trang index
// app.get("/", function(req, res){
//     res.render("index");
// });

// //api detect dữ liệu
// const detect = require("./business/detect");
// app.post("/api/detect", jsonParser,function(req, res){
//     let sms = req.body.sms,
//         bank = req.body.bankCode; //lấy tin nhắn được gửi lên
//     let obj = detect.detectSMS(sms, bank);
//     res.json(obj);
// });

// var a = require("./api/base/dbbase");

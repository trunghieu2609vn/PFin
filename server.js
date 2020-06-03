//startup và cấu hình
var port = 1302;
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Khởi tạo kết nốt db
require('./api/base/dbbase');

//Cấu hình các api
let routes = require('./api/router'); //importing route
routes(app);

/**
 * Kiếm tra xem api có tồn tại
 */
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

//Tạo server
app.listen(port, "127.0.0.1", function(){
    console.log("Server listioning on: http://localhost:1302");
});
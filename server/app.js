//web 项目框架
var express = require('express');
//导入 request 模块 http 请求模块插件
var request = require('request');
var path=require("path");
// 实例化 express 模块
var app = express();

// 术语  ： 路由
var key = "e351449c11bd69dbf2471e39f2744519";
// req : request 浏览器发送给服务器的对象
// res : response 服务器发送给浏览器的对象

app.route('/api').get(function (req, res) {
    request.post({
        url: "http://op.juhe.cn/onebox/weather/query",
        formData: {
            cityname: "北京",
            key: "48f0c60d463f680e427d47cee43b8bc7"
        }
        /**
         * error : 判断结果是否错误
         * response : 请求的头文件信息
         * data ： 返回的结果数据
         */
    }, function (error, response, data) {
        res.send(data);
    });
});
app.get('/xh', function (req, res) {
    console.log(req.param("page"));
    var page = req.param("page");
    var pagesize = 10;
    var time = 1418745237;
    request('http://japi.juhe.cn/joke/content/list.from?key=' + key +
        '&page=' + page +
        '&pagesize=' + pagesize +
        '&sort=asc&time=' + time
        , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                /* console.log(body);*/
                res.send(body);
            }
        });
});
app.get('/xhImg', function (req, res) {
    console.log(req.param("page"));
    var page = req.param("page");
    var pagesize = 10;
    var time = 1418745237;
    request('http://japi.juhe.cn/joke/img/list.from?key=' + key +
        '&page=' + page +
        '&pagesize=' + pagesize +
        '&sort=asc&time=' + time
        , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                /* console.log(body);*/
                res.send(body);
            }
        });
});
// express 开启静态服务器，把指定的目录做跟目录
app.use(express.static(path.join(__dirname,"../dest")));
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
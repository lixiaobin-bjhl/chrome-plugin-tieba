/**
 * @fileOverview server
 * @author XiaoBin Li
 */

var koa = require('koa');
var app = koa();
var http = require('http');
var $ = require('jquery');


app.use(function *() {

    this.body = 'Hello World';
    // var url = 'http://tieba.baidu.com/f/search/ures?ie=utf-8&kw=&qw=&rn=10&un=%E8%B4%B4%E5%90%A7%E5%90%A7%E4%B8%BB%E5%B0%8F%E7%AE%A1%E5%AE%B6&sm=1';
    var html = '';

    // http.get(url, function (res) {  
    //     res
    //         .on('data', function(data) {
    //             html += data; 
    //         })
    //         .on('end', function () {
    //         });      
    // });
});

app.listen(3000);
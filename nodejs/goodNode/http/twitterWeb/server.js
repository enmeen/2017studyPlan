/**
 * Created by Administrator on 2017-4-11.
 */
var http = require('http');
var qs = require('querystring');
http.createServer(function (req,res) {
    var body = '';
    req.on('data',function (chunk) {
        body+=chunk;
    });
    req.on('end',function () {
        res.writeHead(200);
        res.end('done');
        console.log('\n We got: \033[96m' + qs.parse(body).name + '\033[39m')
    })

}).listen(3000);
console.log('open on 3000 port');
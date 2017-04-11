/**
 * Created by Administrator on 2017-4-11.
 */
var http = require('http');
http.createServer(function (req,res) {
    res.writeHead(200,{'Content-type':'image/png'});
    var stream = require('fs').createReadStream('img.png');
    stream.on('data',function (data) {
        res.write(data);
    });
    stream.on('end',function () {
        res.end();
    })
}).listen(3000);
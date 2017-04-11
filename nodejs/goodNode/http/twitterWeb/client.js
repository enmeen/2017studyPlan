/**
 * Created by Administrator on 2017-4-11.
 */

var http = require('http');
var qs = require('querystring');
function send(theName) {
    http.request({
        host:'127.0.0.1',
        port:3000,
        method:'POST'
    },function (res) {
        res.setEncoding('utf8');
        res.on('end',function () {
            console.log('request complete');
            process.stdout.write('\n your name');
        });
    }).end(qs.stringify({name:theName}));
}
process.stdout.write('\n your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data',function (name) {
    send(name.replace('\n',''));
})
/**
 * Created by desen on 2017-4-11.
 */
var http = require('http');
var qs = require('querystring');
var form = '<form method="post" action="/url">' +
    '<h1>my form</h1>' + '<fieldset>' +
    '<label>personal information</label>' + '<p>what is your name</p>' +
    '<input type="text" name="name">' + '<p><button>submit</button></p>' +
    '</fieldset>' +
    '</form>';



http.createServer(function (req,res) {
    if(req.url == '/'){
        res.writeHead(200,{'Content-type':'text/html'});
        res.end(form);
    }else if(req.url == '/url' && req.method == 'POST'){
        var body = '';
        req.on('data',function (chunk) {
            body += chunk
        });
        req.on('end',function () {
            res.writeHead(200,{'Content-type':'text/html'});
            res.end('your name is ' + qs.parse(body).name);
        })
    }else{
        res.writeHead(404,{'Content-type':'text/html'});
        res.end('Not Found');
    }
}).listen(3000);
console.log('open on 3000 port');
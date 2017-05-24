/**
 * Created by desen on 2017/5/15.
 */
let connect = require('connect'),
    timer =require('./middleware');

let server = connect.createServer();
server.use(connect.logger('dev'));
server.use(timer({time:500}));

// fast respone
server.use(function (res,req,next){
    console.log(req.url)
    if('/' == req.url){
        res.writeHead(200);
        res.end('fast respone');
    }else{
        next();
    }
});
// slow respone
server.use(function(res,req,next) {
    if('/slow' == req.url){
        setTimeout(function () {
            res.writeHead(200);
            res.end('slow respone');
        },1000)
    }else{
        next();
    }
});

// listen on 1234

server.listen(1234);
console.log('open http://localhost:1234')
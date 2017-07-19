/**
 * Created by desen on 2017/6/26.
 */

let express = require('express');
let app = express();
let myLogger = function (req, res, next) {
	console.log('LOGGED');
	next();
};
let addReqTime = function (req,res,next) {
	req.reqTime = Date.now();
	next();
};
// 错误处理中间件
let errorFn = function (err,req,res,next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
};
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(myLogger);
app.use(addReqTime);
app.use(errorFn);

app.get('/', function (req, res) {
	let time = req.reqTime;
	res.send('<a href="/index">Hello World!</a>'+ time);
});

app.get('/demo', function (req, res) {
	res.send('Hello demo!');
});
app.get('/index',function (req,res) {
	res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});


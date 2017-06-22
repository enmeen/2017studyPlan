/**
 * Created by desen on 2017/6/20.
 */
let express = require('express');
let mongodb = require('mongodb');
let app = express.createServer();

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'my secret'}));
app.set('view engine','jade');
app.set('view options',{layout:false});

// router
app.get('/',function (req,res) {
	res.render('index',{authenticated:false})
});
app.get('/login/:signupEmail',function (req,res) {
	res.render('login',{signupEmail:req.param.signupEmail});
});
app.get('/signup',function (req,res) {
	app.users.insert(req.body.user,function (err,doc) {
		if(err) return next(err);
		res.redirect('/login/' + doc[0].email)
	});
	/*res.render('signup');*/
});


// 链接数据库
let server = new mongodb.Server('127.0.0.1',27017);
new mongodb.Db('my-website',server).open(function (err,client) {
	if(err) throw  err;
	console.log('\033[96m + \033[39m connected to mongdb');
	app.users = new mongodb.Collection(client,'users');
});



app.listen(3000,function () {
	console.log('\033[96m + \033[39m app listion on *:3000');
});
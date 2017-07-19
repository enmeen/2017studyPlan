/**
 * Created by desen on 2017/6/20.
 */
let express = require('express');
let mongodb = require('mongodb');
let app = express.createServer();

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'my secret'}));
// 身份验证中间件
app.use(function (req, res, next) {
	console.log(req.session.loggedIn);
	if (req.session.loggedIn) {
		res.local('authenticated', true);
		console.log(req.session.loggedIn);
		app.users.findOne({id: req.session.loggedIn}, function (err, doc) {
			if (err) throw err;
			res.local('me', doc);
			next();
		});
	} else {
		res.local('authenticated', false);
		next()
	}
});
app.set('view engine', 'jade');
app.set('view options', {layout: false});

// router
app.get('/', function (req, res) {
	res.render('index');
});
app.get('/login', function (req, res) {
	res.render('login', {signupEmail: false});
});
app.get('/signup', function (req, res) {
	res.render('signup');
});
app.get('/login/:signupEmail', function (req, res) {
	res.render('login', {signupEmail: req.params.signupEmail});
});

//处理注册路由 注意变成了post方法
app.post('/signup', function (req, res, next) {
	// 连接数据库，如不存在则创建该数据库
	console.log(req.body.user);
	let reqData = req.body.user;
	reqData.id = +new Date();
	app.users.insert(reqData, {safe: true}, function (err, doc) {
		if (err) return next(err);
		res.redirect('/login/' + doc[0].email);
	});
	/*res.render('signup');*/
});
// 登录处理路由
app.post('/login', function (req, res) {
	app.users.findOne({email: req.body.user.email, password: req.body.user.password}, function (err, doc) {
		if (err) return next(err);
		if (!doc) return res.send('<p>该用户没有注册，请返回重试</p>');
		req.session.loggedIn = doc.id;
		// 重定向到首页
		res.redirect('/');
	})
});
//退出登录
app.get('/logout', function (req, res) {
	req.session.loggedIn = null;
	res.redirect('/');
});


// 链接数据库
let server = new mongodb.Server('127.0.0.1', 27017);
new mongodb.Db('my-website', server).open(function (err, client) {
	if (err) throw  err;
	console.log('\033[96m + \033[39m connected to mongdb');
	app.users = new mongodb.Collection(client, 'users');
	// 确保查询前建立索引，如果不加索引，全数据库搜索，效率极差
	client.ensureIndex('users', 'email', function (err) {
		if (err) throw err;
		client.ensureIndex('users', 'password', function (err) {
			if (err) throw err;
			console.log('\033[96m + \033[39m ensure indexes');
			app.listen(3000, function () {
				console.log('\033[96m + \033[39m app listion on *:3000');
			});
		})
	})
});




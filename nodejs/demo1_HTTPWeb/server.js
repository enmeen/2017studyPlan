var http = require('http');
var url = require("url");
//处理文件上传
var formidable = require("formidable");
var util = require('util');

//将请求的数据放在服务器中处理
//将路由函数传入进去
function start(route, handle) {

	http.createServer((req, res) => {
		let pathname = url.parse(req.url).pathname;
		if (!(/favicon.ico/).test(pathname)) {
			route(handle, pathname, res, req)
		}
	}).listen(8888);
	console.log("Server has started.");
}



exports.start = start;
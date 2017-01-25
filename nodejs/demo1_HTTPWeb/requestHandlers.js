let exec = require("child_process").exec;
let querystring = require("querystring");
let fs = require("fs");
let formidable = require("formidable");
let util = require('util');

function start(res) {
	/*let content = "empty";
	exec("ls",function(err, stdout, stderr) {	
		content = stdout;
		res.write(content);
		res.end();
	});*/
	let body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" ' +
		'content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" enctype="multipart/form-data" ' +
		'method="post">' +
		'<input type="file" name="upload">' +
		'<input type="submit" value="Upload file" />' +
		'</form>' +
		'</body>' +
		'</html>'
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write(body);
	res.end();
	console.log("Request handler 'start' was called.");

}

function upload(res, req) {
	let form = new formidable.IncomingForm();
	//文件上传   
	//默认是上传到c盘中，由于不能跨区重命名，需要先将图片复制一份到F盘，再重命名
	form.parse(req, function(err, fields, files){
		var readStream = fs.createReadStream(files.upload.path)
   		var writeStream = fs.createWriteStream(__dirname + "/bin/test.jpg");
   		readStream.pipe(writeStream);
		/*//同步重命名方法
		fs.renameSync(files.upload.path,"/bin/test.jpg");*/
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.write("received image:<br/>");
		res.write("<img src='/show' />");
		res.end();
	})
	
	console.log("Request handler 'upload' was called.");

}

function show(res) {
	console.log('显示图片');
	fs.readFile('./bin/test.jpg', 'binary', (err, file) => {
		if (err) {
			res.writeHead(500, {
				"Content-Type": "text/plain"
			});
			res.write(err);
			res.end();
		} else {
			res.writeHead(200, {
				"Content-Type": "image/jpg"
			});
			res.write(file, 'binary');
			res.end();
		}
	})
}


function index(res) {
	res.write('upload');
	res.end();
	console.log("Request handler 'upload' was called.");

}

exports.start = start;
exports.upload = upload;
exports.show = show;
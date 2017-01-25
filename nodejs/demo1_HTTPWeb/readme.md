### 总结

#### 设计思路

- server.js

- router.js

- requestHandles.js

- app.js

  其中app.js是主入口，server.js作为HTTP服务器，router.js作为路由，requestHandles.js作为请求处理。

  ------

  **server.js分析url路径  =》 传递给router.js路由进行分析 =》 requestHandles.js执行正确的请求处理**

  ------

  在此次demo中，res和req通过函数传递的方式，直接有serverjs传递到了requestHandlesjs。在requestHandles中进行处理。

  由于js是单线程运行，所以我们需要合理的使用回调进行非阻塞操作。**但是要注意js中的异步特性。例如想重写一个文档，但是文档因为异步的原因还没有加载完，就执行了重写的操作。**

#### 最后一步图片上传时出现的错误

```javascript
function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");//此处报错
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}
```

这一步将图片上传，以及重命名合在一起了。但是运行后会报错。

原因是`formidable`模块处理文件上传的默认地址为C盘中的某一地址。但是实际我们的本地环境是在F盘中。 fs.renameSync() 方法必须要在同一盘中才能执行。

**解决方案**:

首先我们要将C盘中的文件复制到F盘中，然后在进行重命名操作。

```javascript
function upload(res, req) {
	let form = new formidable.IncomingForm();
	//文件上传   
	//默认是上传到c盘中，由于不能跨区重命名，需要先将图片复制一份到F盘，再重命名
	form.parse(req, function(err, fields, files){
		//文件复制重命名
        var readStream = fs.createReadStream(files.upload.path)
   		var writeStream = fs.createWriteStream(__dirname + "/bin/test.jpg");
   		readStream.pipe(writeStream);
      
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.write("received image:<br/>");
		res.write("<img src='/show' />");
		res.end();
	})
	console.log("Request handler 'upload' was called.");
}
```

*注意*：谷歌上的其中一种解决方案，已经过时不支持了。

```javascript
util.pump(readStream, writeStream, function() {
        fs.unlinkSync(files.upload.path);
 });
```

*相关链接*

[【已解决】Node.js中所用的fs.renameSync出错](http://www.crifan.com/node_js_use_fs_renamesync_error_exdev_cross_device_link_not_permitted/)

[Node.JS fs.rename doesn't work](http://stackoverflow.com/questions/12196163/node-js-fs-rename-doesnt-work)

[Replacing util.pump() in Node.js](http://stackoverflow.com/questions/16381454/replacing-util-pump-in-node-js)

- ​


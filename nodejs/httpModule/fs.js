var fs = require('fs'),
	path = require('path');
//读取文件 
//readFile(filename,[options],callback);
/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
function read() {
	fs.readFile(__dirname + '/test/text.txt', {
		flag: 'r+',
		encoding: 'utf8'
	}, (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(data);
	})
}


// 写文件
var w_date = '有nodejs写入';
var w_date = new Buffer(w_date);

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
function write() {
	fs.writeFile(__dirname + '/test/text.txt', w_date, {
		flag: 'r+',
		encoding: 'utf8'
	}, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log('写入成功');
		}
	})
}

//设想打印出的信息 
//1. txt最初始的文本，
//2. 写入成功
//3. 有nodejs写入
//但是实际node是异步的操作。在进行第一个文件读取的时候，没等读取完成则已经开始运行了下一步的写入操作。
/*read();
write();
read();*/


// 以追加方式写文件
// fs.appendFile(filename,data,[options],callback);
// 
// 打开文件

// fs.open(filename, flags, [mode], callback);
/**
 * filename, 必选参数，文件名
 * flags, 操作标识，如"r",读方式打开
 * [mode],权限，如777，表示任何用户读写可执行
 * callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
 */
function open(){
	fs.open(__dirname + '/test/text.txt','r','0666',(err,fd)=>{
		console.log(fd)
	})
}
open();
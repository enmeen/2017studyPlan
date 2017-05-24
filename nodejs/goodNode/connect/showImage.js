/**
 * Created by Administrator on 2017-4-11.
 * 显示静态图片
 */
var fs = require('fs');
var http = require('http');

// 获取 images文件目录下的图片名
fs.readdir(process.cwd() + '/images', function (err, files) {
    var _imgHtml = '';
    files.forEach(function (val) {
        _imgHtml += '<img src="/images/'+ val +'">';
    });
    createWebServer(files,_imgHtml);
});

function createWebServer(imgName,imgHtml) {
    http.createServer(function (req,res) {
        if(req.url == '/'){
            //第一次进入首页时 渲染html 再根据image中的link 来获取图片数据
            res.writeHead(200,{'Content-type':'text/html'});
            res.end(imgHtml);// 写入image html
        }else{
            imgName.forEach(function (val) {
                if(req.url == '/images/' + val){
                    res.writeHead(200,{'Content-type':'image/png'});
                    var stream = fs.createReadStream(process.cwd() + '/images/' + val);
                    stream.on('data',function (data) {
                        res.write(data);
                    });
                    stream.on('end',function () {
                        res.end();
                    })
                }
            })
        }
    }).listen(3000)
}



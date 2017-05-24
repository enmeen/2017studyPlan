/**
 * Created by desen on 2017/5/14.
 */
/**
 * 请求时间中间件
 * @param opts
 * @returns {Function}
 */
module.exports = function (opts) {
    let time = opts.time || 100;
    return function (res,req,next) {
        var timer = setTimeout(function () {
            console.log(req.method,req.url,'自动打印'); // 当这个请求时间潮超过 规定值时，则打印出改请求
        },100);
        var end = res.end;  // 猴子补丁，重写的方法
        res.end = function (chunk,encoding) {
            res.end = end;
            res.end(chunk,encoding);
            clearTimeout(timer);
        }
        next();
    }
}
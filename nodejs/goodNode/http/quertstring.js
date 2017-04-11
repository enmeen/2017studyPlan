//将url中查询字符串进行解析成一个对象
var obj = require('querystring').parse('name=desen&age=25');
console.log(obj);
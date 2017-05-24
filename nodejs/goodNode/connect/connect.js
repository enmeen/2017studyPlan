/**
 * Created by desen on 2017/5/13.
 */
// this function is same of showImage.js
let connect = require('connect');

let server = connect.createServer();

server.use(connect.static(__dirname + '/webSite'));
server.listen(3000);


console.log('open http://localhost:3000');
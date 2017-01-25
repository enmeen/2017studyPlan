var server = require('./server.js');
var router = require("./router");
var reqHandlers = require('./requestHandlers.js');

let handle = {};
handle['/'] = reqHandlers.start;
handle['/start'] = reqHandlers.start;
handle['/upload'] = reqHandlers.upload;
handle['/index'] = reqHandlers.index;
handle["/show"] = reqHandlers.show;




server.start(router.route,handle);

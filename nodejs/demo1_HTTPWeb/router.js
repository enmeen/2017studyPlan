function route(handle,pathname,res,req) {
 
  if(typeof handle[pathname] === 'function'){
  	 return handle[pathname](res,req);
  }else{
  	res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not found");
    res.end();
  	console.log('no handle found')
  }
}

exports.route = route;
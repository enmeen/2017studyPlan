var http = require('http');
http.get('http://lotus.meili-inc.com/mock/init', (res) => {
	//获取res中的header部分的相关信息
	const statusCode = res.statusCode;
	const contentType = res.headers;
	//转义
	res.setEncoding('utf8');
	let rawDate  = '';
	//获取res中的data部分
	res.on('data',(chunk)=>{
		rawDate += chunk;//赋值给rawDate用来给下一步做处理
		console.log(rawDate)
	});
	res.on('end',()=>{
		try{
			let parsedDate = JSON.parse(rawDate);
			
			console.log(parsedDate.data)
		}catch(e){
			console.log('解析失败')
		}
	}).on('error',(e) => {
		console.log(`${e.message}`)
	})
})
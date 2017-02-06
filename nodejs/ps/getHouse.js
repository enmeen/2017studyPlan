let http = require('http'); // http 网路
let cheerio = require('cheerio'); // html 解析
let fs = require("fs"); // 流



const href = 'http://hangzhou.anjuke.com/sale/xihu/a66-o5-p1-rd1/?kw=%E6%9D%AD%E5%B7%9E&from_url=kw_final';

let isFirst = true; //保证每次运行都能重写重写文档。
/**
 * 获取html
 * @param  {object} option 包含href字段和search字段，以及搜索页数pageMax
 *  {
 *  	href:[http://hangzhou.anjuke.com/sale/xihu/a66-o5-,-rd1/?kw=%E6%9D%AD%E5%B7%9E&from_url=kw_final'],
 *  	search:1,
 *  	pageMax:10
 *  }
 */
function getHtml(option) {
	//设置配置项
	let pageMax = option.pageMax || 10;
	let href = option.href;
	let search = option.search || 1;
	//处理href
	let _href = href[0] + search + href[1];

	let pageDate = ''; //存储服务器返回数据
	

	http.get(_href, function(res) { //GET请求便捷方法
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			pageDate += chunk;
		});
		res.on('end', function() {
			$ = cheerio.load(pageDate);

			let item = $('.list-item');
			let titleHtml = item.find($('.house-details .houseListTitle'));
			let priceHtml = item.find($('.pro-price .price-det strong'));
			let areaHtml = item.find($('.house-details .details-item span'));

			if (!item.length) { //当页面没有数据时结束循环
				return false;
			}
			console.log('正在获取第' + search + '页');

			//需要爬取的数据
			let title;
			let src;
			let href;
			let area = [];

			//处理的数据存放处
			let outContextArr = [];
			let outContext = outTitle;

			//由于无法直接获得每个.details-item中的第一个含有平方的span。所以写了一个循环。
			for (let j = 0; j < areaHtml.length; j++) {
				let _area = areaHtml[j].children[0].data;
				if (/平方/.test(_area)) {
					area.push(_area);
				}
			}

			
			for (let i = 0; i < item.length; i++) {
				let titleAtt = titleHtml[i].attribs;
				/*
					将数据添加成对象之中，方便后续对对象数组进去重
					{
						href:1
						title:2
						price:3
						area:4
					}					
								 */
				outContextArr.push({ //
						title: titleAtt.title,
						price: priceHtml[i].children[0].data,
						href: titleAtt.href,
						area: area[i]
					})
			}
			outContextArr = unique(outContextArr, 'title');

			for(let k = 0;k < outContextArr.length; k++){
				let _data = outContextArr[k];
				
				title = '- [' + _data.title + '](' + _data.href + ')';
				price = '——'+_data.price +'万';
				area = '——' + _data.area;
				outContext += title + price+ area + '\r\n';
			}
			writeFs(outContext, isFirst);
			//判断循环是否结束
			if (search < pageMax) {
				++option.search;
				getHtml(option);
			} else {
				console.log('搜索结束');
			}
		})
	})

}

//将内容写入到文件当中，格式为md
function writeFs(content, state) {
	let site = './house/demo.md';
	if (state) {
		fs.writeFile(site, content, function(err) {//没有则创建文件。
			console.log('创建文件成功');
			isFirst = false;
		})
	} else {
		fs.appendFile(site, content, function(err) { //追加文件数据写入，没有则创建文件。

		});
	}

}
/**
 * 对象数组去重
 * @param  {[array]} objArr [对象数组]
 * @param  {[string]} key    [去除对象数组中的默认键值]
 * @return {[array]}        [去重后的数组]
 */
function unique(objArr, key) {
	let n = []; //一个新的临时数组
	let out = [];
	//遍历当前数组
	for (let i = 0; i < objArr.length; i++) {
		if (n.indexOf(objArr[i][key]) == -1) {
			n.push(objArr[i][key]);
			out.push(objArr[i]);

		}
	}
	return out;
}


//配置信息

let option = {
	href: ['http://hangzhou.anjuke.com/sale/xihu/a65-o5-p', '-rd1/?kw=%E6%9D%AD%E5%B7%9E&from_url=kw_final'],
	search: 1,
	pageMax: 10
}
let outTitle = '##安居客，70-90平方, 按时间最新排序,已过滤重复信息 \r\n'; //存储输出的文本。
getHtml(option);
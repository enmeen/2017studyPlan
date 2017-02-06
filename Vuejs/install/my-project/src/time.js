//获取当前时间
//输出y-m-d的日期格式

export default {
	getTime() {
		let date = new Date();
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		let d = date.getDate();
		return y + '-' + m + '-' + d;
	}
}
//封装localStorage , 以字符串的形式保存在浏览器中
//1. JSON.parse() 中的参数需要符合 json字符格式

export default function(STORE_NAME) {
	return {
		fetch() {
			return JSON.parse(window.localStorage.getItem(STORE_NAME))
		},
		save(items) {
			window.localStorage.setItem(STORE_NAME, JSON.stringify(items))
		},
		clear() {
			window.localStorage.setItem(STORE_NAME, '[]')
		}
	}

}
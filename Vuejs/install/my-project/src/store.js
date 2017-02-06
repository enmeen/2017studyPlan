//封装localStorage , 以字符串的形式保存在浏览器中
//1. JSON.parse() 中的参数需要符合 json字符格式
const VUE_STORE = 'vuetodo-list';
export default {
	fetch(){
		return JSON.parse(window.localStorage.getItem(VUE_STORE))
	},
	save(items){
		window.localStorage.setItem(VUE_STORE,JSON.stringify(items))
	},
	clear(){
		window.localStorage.setItem(VUE_STORE,'[]')
	}
}


/**
 * Created by desen on 2017/7/24.
 */
function isArray(value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}
// 进行虚拟DOm的类型的判断
function isVtext(vNode) {
	return true;
}


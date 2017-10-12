/**
 * Created by desen on 2017/8/10.
 */

/**********共有静态成员************/
function getA(name) {
	this.name = name;
}
//静态方法
getA.isStatic = function () {
	var msg = 'hello';
	return msg + this.name;
};
//原型方法
getA.prototype.isStatic = function () {
	return getA.isStatic.call(this)
}
var obj = new getA(' desen');
obj.isStatic()

console.log(obj.isStatic(),getA.isStatic())// hello desen,hello getA
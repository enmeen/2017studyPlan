//发布者
var pub = {
	publish:function(){
		dep.notify();
	}
}
//三个订阅者
var sub1 = {update:function(){console.log(1)}};
var sub2 = {update:function(){console.log(2)}};
var sub3 = {update:function(){console.log(3)}};
//一个主题对象:调度作用，负责订阅者的添加和删除
function Dep(){
	this.subs = [sub1,sub2,sub3];
}
// setter
Dep.prototype.notify = function(){
	this.subs.forEach(function(sub){
		sub.update();
	})
}

//发布者发布消息，主题对象执行notify方法，进而触发订阅者执行update方法
var dep = new Dep();
pub.publish();
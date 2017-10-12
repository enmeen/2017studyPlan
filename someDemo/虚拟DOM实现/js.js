/**
 * Created by desen on 2017/7/24.
 */


//创建虚拟DOM对象
function Vnode(tagname, props, children, key) {
	this.tagName = tagname;
	this.props = props || {};
	this.children = children || [];
	this.key = key;
}
function Vtext(text) {
	this.text = String(text);
}


// create-element 函数
function createNode(Vnode) {
	let tagname, props, children, key;
	tagname = Vnode.tagname || 'div';
	props = Vnode.props;
	let dom = document.createElement(tagname);
	for (let k in Vnode.props) {
		if (Vnode.props.hasOwnProperty(k)) {
			console.log(k)
			dom.setAttribute(k, Vnode.props[k]);
		}
	}
	for (let i = 0; i < Vnode.children.length; i++) {
		let child = Vnode.children[i];
		// 对child进行类型判定，根据类型进行操作
		if(isVtext(child)){
			dom.appendChild(document.createTextNode(child.text))
		}
	}
	return dom

}
// TODO diff 比较2个vnode的不同，并且将不同点保存下来
function diff(a,b) {
	
}
// TODO 将保存下来的不同点更新到原vnode中，生成最新的dom
function patch() {
	
}

let testText = new Vtext('it is dom form vNode');
let testNode = new Vnode('div', {id: 'test', class: 'myclass', k: 'i am k'}, [testText]);
// => <div id='test'></div>
let a = createNode(testNode);

document.querySelector('.c').appendChild(a);
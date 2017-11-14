/**
 * Created by desen on 2017/10/19.
 */
function Node(element) {
	this.next = null;
	this.element = element;
}

function LList() {
	this.head = new Node("head");
	this.find = find;
	this.insert = insert;
	this.remove = remove;
	this.display = display;
}
function find(item) {
	var currNode = this.head;
}
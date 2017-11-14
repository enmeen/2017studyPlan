/**
 * Created by desen on 2017/10/23.
 */
// 需要2个类 1. Node类 代表树上的每个节点 2. BST类 代表2查找叉树
class Node {
	constructor(data, left, right) {
		this.data = data;
		this.left = left;
		this.right = right;
	}

	show() {
		return this.data;
	}
}


class BST {
	constructor() {
		this.root = null;
	}

	insert(data) {
		let n = new Node(data, null, null);
		if (this.root === null) {
			this.root = n;
		} else {
			let current = this.root;
			let parent;
			while (true) {
				parent = current;
				if (data < current.data) {
					current = current.left;
					if (current === null) {
						parent.left = n;
						break;
					}
				} else {
					current = current.right;
					if (current === null) {
						parent.right = n;
						break;
					}
				}
			}
		}
	}

	inOrder(node) {
		// 中序递归
		if (node !== null) {
			this.inOrder(node.left);
			console.log(node.show());
			this.inOrder(node.right);
		}
	}

	getMin() {
		let current = this.root;
		while (!(current.left === null)) {
			current = current.left;
		}
		return current.data;
	}

	getMax() {
		let current = this.root;
		while (!(current.right === null)) {
			current = current.right;
		}
		return current.data;
	}

	find(data) {
		let current = this.root;
		while (current !== null) {
			if (data === current.data) {
				return current;
			} else if (data < current.data) {
				current = current.left;
			} else if (data > current.data) {
				current = current.right;
			}
		}
		return null;
	}
	remove(data){
		root = this.removeNode(this.root,data);
	}
	removeNode(node,data){
		if(node === null){
			return null;
		}
		if(data === node.data){
			if(node.left === null && node.right === null){
				// 没有子节点的节点
				return null;
			}
			if(node.left === null){
				// 没有左子节点的节点
				return node.right
			}
			if(node.right === null){
				// 没有右子节点的节点
			}
		}
	}

}
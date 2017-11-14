/**
 * Created by desen on 2017/10/16.
 */
// 列表抽象类
class List {
	constructor() {
		this.listSize = 0;
		this.pos = 0;
		this.dataStore = [];
	}

	clear() {
		this.listSize = 0;
		this.dataStore = [];
		this.pos = 0;
	}

	toString() {
		return this.dataStore;
	}

	length() {
		return this.listSize;
	}

	getElement() {
		return this.dataStore[this.pos];
	}

	insert(element, after) {
		let index = this.find(after);
		if (index > -1) {
			this.dataStore.splice(index + 1, 0, element);
			++this.listSize;
			return true;
		}
		return false;
	}

	append(element) {
		this.dataStore[this.listSize++] = element;
	}

	find(element) {
		for (let i = 0; i < this.listSize; i++) {
			if (this.dataStore[i] === element) {
				return i
			}
		}
		return -1;
	}

	remove(element) {
		let pos = this.find(element);
		if (pos > -1) {
			this.dataStore.splice(pos, 1);
			--this.listSize;
			return true;
		} else {
			return false;
		}
	}

	front() {

	}

	end() {
	}

	prev() {
	}

	next() {
	}

	currPos() {
	}

	moveTo() {
	}
}
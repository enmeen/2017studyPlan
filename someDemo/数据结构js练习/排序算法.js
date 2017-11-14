/**
 * Created by desen on 2017/11/8.
 */

class CArray {
	constructor(numElements) {
		this.dataStore = [];
		this.pos = 0;
		this.numElements = numElements;
		for (let i = 0; i < numElements; ++i) {
			this.dataStore[i] = i;
		}
	}

	setData() {
		for (let i = 0; i < this.numElements; ++i) {
			this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
		}
	}

	clear() {
		for (let i = 0; i < this.dataStore.length; ++i) {
			this.dataStore[i] = 0;
		}
	}

	insert(element) {
		this.dataStore[this.pos++] = element;
	}

	toString() {
		let restr = "";
		for (let i = 0; i < this.dataStore.length; ++i) {
			retstr += this.dataStore[i] + " ";
			if (i > 0 & i % 10 == 0) {
				retstr += "\n";
			}
		}
		return retstr;
	}

	swap(arr, index1, index2) {
		let temp = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = temp;
	}

	// 冒泡排序
	// 每次都比较2位，且值越大的就往后推
	bubbleSort() {
		let numElements = this.dataStore.length;
		let temp;
		for (let outer = numElements; outer >= 2; --outer) {
			for (let inner = 0; inner <= outer - 1; ++inner) {
				if (this.dataStore[inner] > this.dataStore[inner + 1]) {
					this.swap(this.dataStore, inner, inner + 1);
				}
			}
		}
	}

	// 插入排序
	insertionSort() {
		let temp, inner;
		for (let outer = 1; outer <= this.dataStore.length - 1; ++outer) {
			temp = this.dataStore[outer];
			inner = outer;
			while (inner > 0 && (this.dataStore[inner - 1] >= temp)) {
				this.dataStore[inner] = this.dataStore[inner - 1];
				--inner;
			}
			this.dataStore[inner] = temp;
		}
	}

	// 选择排序
	selectionSort() {
		let min, temp;
		for (let outer = 0; outer <= this.dataStore.length-2; ++outer) {
			min = outer;
			for (let inner = outer + 1;
			     inner <= this.dataStore.length-1; ++iner) {
				if (this.dataStore[inner] < this.dataStore[min]) {
					min = inner; }
				swap(this.dataStore, outer, min);
			}
		}
	}

}
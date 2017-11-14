/**
 * Created by desen on 2017/10/17.
 */
// 一种后入后出的数据结构为队列，非栈
class Inn {
	constructor(){
		this.dataStore = [];
		this.size = 0;
	}
	pop(){
		this.size--;
		return this.dataStore.splice(0,1)
	}
	push(element){
		this.dataStore.push(element);
		this.size++;
	}
	peek(){
		return this.dataStore[0];
	}
	clear(){
		this.dataStore = [];
		this.size = 0;
		return true;
	}
	length(){
		return this.size
	}

}
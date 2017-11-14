/**
 * Created by desen on 2017/10/16.
 */
//创建一个记录学生成绩的对象，提供一个添加成绩的方法，以及一个显示学生平均成绩的方法。

function ReportCard() {
	this.card = [];
	this.add = add;
	this.showAverage = showAverage;
}
function add(number) {
	this.card.push(number);
}
function showAverage() {
	let average = 0;
	let len = this.card.length;
	console.log(len)
	this.card.forEach(function (value) {
		average = average + value;
	});
	console.log(average)
	average = average/len;
	return average;
}

let test = new ReportCard();
test.add(1);
test.add(2);
test.add(3);
test.add(4);
console.log(test.showAverage());



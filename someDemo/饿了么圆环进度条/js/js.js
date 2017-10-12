function addCanvas(countNum, targetNum, qualStatus, qualNum) {

	if (targetNum <= 0) {
		return false;
	}
	var rate = countNum / targetNum;
	var canvas = document.createElement('canvas');
	var centerX = 150;
	var centerY = 140;
	canvas.className = 'canvas';
	canvas.style.width = '100%';
	canvas.style.height = '100%';
	canvas.setAttribute('width', '300');
	canvas.setAttribute('height', '280');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		// 外部圆
		ctx.save();
		ctx.beginPath();
		ctx.arc(centerX, centerY, 130, .75 * Math.PI, 2.25 * Math.PI);
		ctx.shadowOffsetX = 0; // 阴影Y轴偏移
		ctx.shadowOffsetY = 0; // 阴影X轴偏移
		ctx.shadowBlur = 20; // 模糊尺寸
		ctx.shadowColor = '#EBB05F'; // 颜色
		ctx.strokeStyle = '#F7D9AD';
		ctx.lineWidth = 10;
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.restore();
		// 进度条
		ctx.beginPath();
		if (rate == 0) {
			ctx.arc(centerX, centerY, 130, 0, 0, false); // .78 ～ 2.22
		} else if (rate > 0 && rate < 1) {
			ctx.arc(centerX, centerY, 130, .75 * Math.PI, (rate * 1.5 + .75) * Math.PI, false);
		} else if (rate >= 1) {
			ctx.arc(centerX, centerY, 130, .75 * Math.PI, 2.25 * Math.PI, false);
		}
		ctx.lineWidth = 10;
		ctx.lineCap = "round";
		ctx.strokeStyle = '#675136';
		ctx.stroke();
		// 绘制文字
		ctx.fillStyle = "#675136";
		ctx.font = "64px '微软雅黑'";
		ctx.textAlign = 'center';
		if (countNum > targetNum) {
			countNum = targetNum;
		}
		ctx.fillText(countNum + '/' + targetNum, centerX, centerY);
		ctx.font = "24px '微软雅黑'";
		console.log(qualStatus, qualNum)
		if (qualStatus === 0 && qualNum === 0) {
			ctx.fillText('再买' + (targetNum - countNum) + '单即可换购', centerX, centerY + 40);
		} else if (qualNum > 1 && countNum === targetNum && qualStatus !== 0) {
			// 有换购资格，且集单数达到目标
			ctx.fillText('本月任务已完成', centerX, centerY + 40);
		} else {
			ctx.fillText('买多单换购', centerX, centerY + 40);
			// other code
		}
		var $countdownwrap = $('.countdownwrap');
		$countdownwrap.html(canvas);
	} else {
		// canvas-unsupported code here
	}
}

addCanvas(2,5,0,0)
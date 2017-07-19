$(function () {
	$btn = $('.btn');
	$btn.on('click',function (e) {
		$.ajax({
			type: "POST",
			url: '/api/login/createAccount',
			data: data,
			success: success,
			dataType: dataType
		});
	});
});


/**
 * Created by desen on 2017/6/28.
 */
$(function () {
	var $box = $('.box');
	$box.on('click',function (e) {
		$.ajax({
			type: "GET",
			url: '/api/test/getData',
			data: null,
			success: function (data) {
				$box.append('<br/>' + data[0].account + ' ' + data[0].password);
			},
			dataType: 'json'
		});
	})
});
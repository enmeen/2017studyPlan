/**
 * Created by desen on 2017/7/14.
 */


$(function () {
	function isNeedLoad(distance, callback) {
		var wHeight = $(window).height();
		var dHeight = $(document).height();
		var s = $(window).scrollTop();
		if (dHeight - s - wHeight <= distance || 0) {
			callback && callback();
		}
	}

	$(window).on('scroll', function (e) {
		isNeedLoad(0,function () {
			$('.wrap').append('<div class="box"></div>')
		});
	})

});
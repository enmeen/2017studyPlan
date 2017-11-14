/*
 * @Author: hefan
 * @Date:   2016-03-7 15:45:35
 * @Last Modified by:   Marte
 * @Last Modified time: 2016-03-7 15:45:35
 * 说明文档：http://doc.market.mogujie.org/doc/f2e/cube-code-module/cube-module-setalert.html 现由@谢雍维护
 */
define('fastbuy/Reminder', ['base/MoGu'], function (MoGu) {

	var dateFormat = function () {
		var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
			timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
			timezoneClip = /[^-+\dA-Z]/g,
			pad = function (val, len) {
				val = String(val);
				len = len || 2;
				while (val.length < len) val = "0" + val;
				return val;
			};

		// Regexes and supporting functions are cached through closure
		return function (date, mask, utc) {
			var dF = dateFormat;

			// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
			if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
				mask = date;
				date = undefined;
			}

			// Passing date through Date applies Date.parse, if necessary
			date = date ? new Date(date) : new Date;
			if (isNaN(date)) throw SyntaxError("invalid date");

			mask = String(dF.masks[mask] || mask || dF.masks["default"]);

			// Allow setting the utc argument via the mask
			if (mask.slice(0, 4) == "UTC:") {
				mask = mask.slice(4);
				utc = true;
			}

			var _ = utc ? "getUTC" : "get",
				d = date[_ + "Date"](),
				D = date[_ + "Day"](),
				m = date[_ + "Month"](),
				y = date[_ + "FullYear"](),
				H = date[_ + "Hours"](),
				M = date[_ + "Minutes"](),
				s = date[_ + "Seconds"](),
				L = date[_ + "Milliseconds"](),
				o = utc ? 0 : date.getTimezoneOffset(),
				flags = {
					d: d,
					dd: pad(d),
					ddd: dF.i18n.dayNames[D],
					dddd: dF.i18n.dayNames[D + 7],
					m: m + 1,
					mm: pad(m + 1),
					mmm: dF.i18n.monthNames[m],
					mmmm: dF.i18n.monthNames[m + 12],
					yy: String(y).slice(2),
					yyyy: y,
					h: H % 12 || 12,
					hh: pad(H % 12 || 12),
					H: H,
					HH: pad(H),
					M: M,
					MM: pad(M),
					s: s,
					ss: pad(s),
					l: pad(L, 3),
					L: pad(L > 99 ? Math.round(L / 10) : L),
					t: H < 12 ? "a" : "p",
					tt: H < 12 ? "am" : "pm",
					T: H < 12 ? "A" : "P",
					TT: H < 12 ? "AM" : "PM",
					Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
					o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
					S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
				};

			return mask.replace(token, function ($0) {
				return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
			});
		};
	}();

	// Some common format strings
	dateFormat.masks = {
		"default": "ddd mmm dd yyyy HH:MM:ss",
		shortDate: "m/d/yy",
		mediumDate: "mmm d, yyyy",
		longDate: "mmmm d, yyyy",
		fullDate: "dddd, mmmm d, yyyy",
		shortTime: "h:MM TT",
		mediumTime: "h:MM:ss TT",
		longTime: "h:MM:ss TT Z",
		isoDate: "yyyy-mm-dd",
		isoTime: "HH:MM:ss",
		isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	};

	// Internationalization strings
	dateFormat.i18n = {
		dayNames: [
			"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		],
		monthNames: [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
			"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		]
	};

	// For convenience...
	Date.prototype.format = Date.prototype.format || function (mask, utc) {
			return dateFormat(this, mask, utc);
		};

	var Reminder = function (options) {
		this.opts = $.extend({}, this.defaults, options);
		this.db = new this.database();
		this.tips = new this.tips();
		this.init();
	}

	Reminder.prototype = {
		vendor: {
			support: false, // 是否支持日历提醒功能
			cancelable: false, // 是否支持取消
			devFlag: false
		},
		init: function () {


			var self = this;
			document.addEventListener('deviceready', function () {
				// 不支持日历
				if (!window.mgj) {
					if (self.opts.errrorText) {
						self.tips.show(self.opts.needCancelText);
					}
					return;
				}

				var versionLow = mgj.calendarAction && typeof mgj.calendarAction.add === 'function';
				var versionHigh = mgj.calendar && typeof mgj.calendar.deleteEvent === 'function' && typeof mgj.calendar.createEventWithOptions === 'function';


				if (!versionLow && !versionHigh) {
					if (self.opts.errrorText) {
						self.tips.show(self.opts.needCancelText);
					}
					return;
				}

				// 对于不支持高版本App的安卓机，日历功能的接口有点问题，我们不支持这种提醒
				if (!versionHigh && $.os.android) {
					if (self.opts.errrorText) {
						self.tips.show(self.opts.needCancelText);
					}
					return;
				}

				$('body').addClass('reminder_box').addClass('J_reminder_box');

				self.vendor.support = true;
				if (versionHigh) {
					self.vendor.cancelable = true;
				}

				self.vendor.devFlag = true;
				self.checkReminder();

				// 添加提醒 - 取消提醒
				// 对应的DOM绑定事件
				self.opts.container.on('click', '.' + self.opts.objsClassName, function (evt) {
					// 不支持日历
					if (!self.vendor.support) {
						if (self.opts.errrorText) {
							self.tips.show(self.opts.needCancelText);
						}
						return;
					}

					var $this = $(this);

					var startTime = new Date(1000 * parseInt($this.data('start-time'), 10)),
						endTime = new Date(startTime.getTime() + 3600 * 1000); // 结束时间向后延一个小时
					// 读取dom中的实际配置项
					var config = {
						title: self.opts.localTitle + '：' + $this.data('title'),
						subTitle: '【' + self.opts.sideName + '】：' + self.opts.localTitle,
						description: '【' + self.opts.localTitle + '】：' + $this.data('title') + '  ' + $this.data('link'),
						location: 'Home',
						alertTime: self.opts.alertTime || 3, // 默认 3 分钟
						needReminder: 1,
						startTime: startTime.format('yyyy-mm-dd HH:MM:ss'),
						endTime: endTime.format('yyyy-mm-dd HH:MM:ss')
					};

					var id = ($this.data('alert-id') || $this.data('id')).toString();
					// 取消设置提醒的逻辑
					if (self.vendor.cancelable) {
						// 能够取消的情况
						if ($this.hasClass('J_reminder_alerted') && $this.attr('need-cancel') !== 'no') {
							// 能够取消提醒 && 已经设置过
							mgj.calendar.deleteEvent(config.title, config.location, config.description, startTime, endTime, function () {

								$this.removeClass('J_reminder_alerted');
								self.db.removeItem(id);
								self.tips.show('取消提醒成功');

								//设置提醒打点
								var logType = $this.data('log-type') || '0';
								self.triggerLog({
									itemid: id,
									type: logType,
									status: 'off'
								});

								self.cancelReminderCallback($this, true);

							}, function () {
								self.tips.show('取消提醒不成功，请开启系统日历权限或iCloud设置');
								self.cancelReminderCallback($this, false);
							});
						} else {
							// 能够取消提醒 && 没有
							if ($this.hasClass('J_reminder_alerted') || $this.hasClass('J_reminder_alertdy')) {
								if (self.opts.needCancelText) {
									self.tips.show(self.opts.needCancelText);
								}
								return;
							}

							var calOptions = mgj.calendar.getCalendarOptions();
							calOptions.firstReminderMinutes = config.alertTime;

							mgj.calendar.createEventWithOptions(config.title, config.location, config.description, startTime, endTime, calOptions, function () {

								$this.addClass('J_reminder_alerted');
								self.db.addItem(id, startTime.getTime());

								self.tips.show(self.opts.successText);

								//设置提醒打点
								var logType = $this.data('log-type') || '0';
								self.triggerLog({
									itemid: id,
									type: logType,
									status: 'on'
								});
								self.setReminderCallback($this, true);

							}, function () {
								self.tips.show('设置提醒不成功，请开启系统日历权限或iCloud设置');
								self.setReminderCallback($this, false);
							});
						}
					} else {

						//如果手机不支持取消提醒，或者不喜欢用户取消提醒，判断是否包含这两个类
						if ($this.hasClass('J_reminder_alerted') || $this.hasClass('J_reminder_alertdy')) {
							if (self.opts.needCancelText) {
								self.tips.show(self.opts.needCancelText);
							}
							return;
						}

						mgj.calendarAction.add(function () {

							// 添加设置提醒时进行的操作
							$this.addClass('J_reminder_alertdy');
							self.db.addItem(id, startTime.getTime());

							self.tips.show(self.opts.successText);
							//设置提醒打点
							var logType = $this.data('log-type') || '0';
							self.triggerLog({
								itemid: id,
								type: logType,
								status: 'on'
							});
							self.setReminderCallback($this, true);
						}, function () {
							self.tips.show('设置提醒不成功，请开启系统日历权限或iCloud设置');
							self.setReminderCallback($this, false);
						}, config);

					}
					evt.preventDefault();
					evt.stopPropagation();

					return;
				});
			});
		},
		checkReminder: function (checkBox) {
			var self = this;
			var myCheckBox = checkBox ? checkBox : self.opts.container;

			if (!self.vendor.devFlag) return;

			var cancel = $('.J_reminder_alert').attr('need-cancel');

			var mods = myCheckBox.find('.' + self.opts.objsClassName);
			mods.each(function () {
				var $this = $(this);
				var cancel = $this.attr('need-cancel');
				// 如果不是reminderBox则忽略
				if (!$this.hasClass('J_reminder_alert')) return;

				if (self.db.getItem($this.data('alert-id') || $this.data('id'))) {
					if (self.vendor.cancelable) {
						if (cancel == 'no') {
							$this.addClass('J_reminder_alertdy');
						} else {
							$this.addClass('J_reminder_alerted');
						}
					} else {
						$this.addClass('J_reminder_alertdy');
					}
					;
				}
			});
		},
		database: function () {
			var rKeyPattern = /^mogu-id-/,
				timeout = 3600 * 72 * 1000; // 清空掉三天之前的数据

			var keyPrefix = this.keyPrefix = 'mogu-id-'; // 需要保证与rKeyPattern对应上


			this.cleanup = function () {
				var keys = Object.keys(localStorage),
					now = +(new Date());
				for (var i = 0, len = keys.length; i < len; i++) {
					var key = keys[i];
					if (!rKeyPattern.test(key)) continue;
					var date = localStorage.getItem(key);
					date = parseInt(date, 10);
					if (date < now && now - date > timeout) {
						localStorage.removeItem(key);
					}
				}
				return this;
			};

			// TODO(xuanfeng): should return true or false to indicate success
			this.addItem = function (key, value) {
				value = +value;
				if (!isNaN(value)) {
					localStorage.setItem(keyPrefix + key, +value);
				}
				return this;
			};

			this.removeItem = function (key) {
				localStorage.removeItem(keyPrefix + key);
				return this;
			};

			this.getItem = function (key) {
				var value = localStorage.getItem(keyPrefix + key);
				return value;
			};

		},
		tips: function () {
			var $tipEl = $('#MGJ_Tips');
			if ($tipEl.length <= 0) {
				$tipEl = $('<div id="MGJ_Tips" class="ui-tips" style="display: none;"><h4 class="ui-tips-text"></h4></div>');
				$('body').append($tipEl);
			}

			this.show = function (text) {
				var $el = $tipEl,
					$text = $el.find('.ui-tips-text');

				this.stop();

				$text.text(text);
				$el.show();
				$tipEl.addClass('bounceInUp');

				this.hide();
			},
				this.hide = function () {
					var $el = $tipEl;
					this.timeout = setTimeout(function () {
						$el.hide();
					}, 2000);
				},
				this.stop = function () {
					var $el = $tipEl;
					$el.hide();
					clearTimeout(this.timeout);
					$tipEl.removeClass('bounceInUp');
				}

		},
		triggerLog: function (logData) {

			var eventid = '016000116'; // 000000018
			if (window.logger && logger.log) {
				logger.log(eventid, logData);
				return true;
			}
			return false;
		},

		// 2 fn below added by xieyong
		setReminderCallback: function ($reminderBtn, isSucc) {
		},
		cancelReminderCallback: function ($reminderBtn, isSucc) {
		},
		defaults: {
			objsClassName: 'J_reminder_alert', // 动态模块容器
			container: $('.page_activity').length > 0 ? $('.page_activity') : $('body'),
			successText: '设置成功，提前 3 分钟提醒菇凉哦',
			needCancelText: '',
			errrorText: '',
			localTitle: '快抢提醒',
			sideName: '蘑菇街'
		}
	};

	window.MoGu.Reminder = window.MoGu.Reminder || Reminder;

	return Reminder;
});

require(['fastbuy/Reminder'], function () {
})
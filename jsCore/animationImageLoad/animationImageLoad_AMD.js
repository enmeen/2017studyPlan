/**
 * Created by desen on 2017/6/7.
 */
// 基于zepto使用Promise 实现所有动画图片的加载
// 依赖M对象中的是否支持webp参数
// 对于支持webp格式的图片使用对应的webp后缀
// 用于img背景
//  问题的关键是对与webp是否支持的读取


define('animationImgLazy', [], function () {
    var ImgUrlTool = {
        // 默认的后缀
        imgQuality: 70,
        defCode: '999x999.v1c0',
        // 需要初始化后才能确定的参数值
        // 屏幕宽度
        clientHeight: null,
        // 屏幕高度
        clientWidth: null,
        // 设备dpr
        dpr: null,
        // 设备实际的dpr宽度
        dprClentWidth: null,
        //是否支持webp
        isSupportWebp: M && M.isUseWebp || false
    };
    ImgUrlTool.init = function (imgUrl, useWebp) {
        var _self = this;
        _self.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        _self.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        // 获取dpr及屏幕dpr宽度
        _self.dpr = window.devicePixelRatio >= 1 ? window.devicePixelRatio : 1;
        _self.dprClentWidth = _self.clientWidth * _self.dpr;
    }
    /**
     *
     * @param imgUrl
     * @param width
     * @param useWebp
     * @param needDprFix
     */
    ImgUrlTool.getWidthSuffix = function (imgUrl, width, useWebp, needDprFix) {
        var _self = this;
        //needDprFix默认值为true
        if (typeof needDprFix == "undefined") needDprFix = true;
        var imgCode = _self.defCode;
        // dpr倍数
        var dprMulti = needDprFix ? _self.dpr : 1;
        // 图片宽度
        var boxWidth = parseInt(width) * dprMulti;
        // boxWidth在0到2000的情况下，加上宽度dpr后缀
        if (boxWidth && boxWidth > 0 && boxWidth < 1950) {
            // 提高半个档位的清晰度
            boxWidth += 50;
            imgCode = Math.ceil(boxWidth / 100) * 100 + 'x9999.v1c7E';
        }
        return _self.getCodeSuffix(imgUrl, imgCode, useWebp);
    }
    ImgUrlTool.getCodeSuffix = function (imgUrl, imgCode, useWebp) {
        var _self = this;
        // 传入图片为异常值 , 已经是webp的url，直接退出
        if (!imgUrl || !imgCode || !imgCode || imgUrl.indexOf('.webp') > 0 || imgUrl.indexOf('.gif') > 0) return imgUrl;
        // 非正常mogujieCDN图片链接直接返回
        if (imgUrl.indexOf('mogucdn') === -1) return imgUrl;
        // 不是jpg和png直接退出
        if (imgUrl.indexOf('.jpg') < 0 && imgUrl.indexOf('.png') < 0) return imgUrl;
        // 同时含有jpg和png两个后缀的异常图片直接退出
        if (imgUrl.indexOf('.jpg') > 0 && imgUrl.indexOf('.png') > 0) return imgUrl;
        // 处理图片去https，http
        if (imgUrl.indexOf('https:') >= 0) imgUrl = imgUrl.split('https:')[1];
        if (imgUrl.indexOf('http:') >= 0) imgUrl = imgUrl.split('http:')[1];

        // 原图片
        var imgOrg = imgUrl;
        // 判断图片格式 非png和jpg返回原图
        var imgType = '';
        // url获取图片的格式
        var imgArr = imgUrl.split('.');
        if (imgArr[imgArr.length - 1] == 'jpg') {
            imgType = 'jpg';
        } else if (imgArr[imgArr.length - 1] == 'png') {
            imgType = 'png';
        } else {
            // 处理异常，直接返回原图链接
            return imgUrl;
        }
        // 补全压缩code
        var imgCode = '_' + imgCode;
        // 补全图片品质 这里默认传70
        var imgQuality = '.' + _self.imgQuality + '.';
        // 站内原图(jpg/png)添加需要的后缀,如果已经有拼接后缀则不处理
        if (imgUrl.indexOf('.png_') < 0 && imgUrl.indexOf('.jpg_') < 0 && imgUrl.indexOf('.' + imgType) == (imgUrl.length - 4)) {
            imgUrl = imgUrl + imgCode + imgQuality + imgType;
        }
        // 浏览器不支持webp,或者useWebp为false，直接返回源地址
        if (useWebp === false) {
            // 如果是png返回不加处理的图片链接
            if (imgType == 'png') return imgOrg;
        } else if (imgUrl.indexOf('.' + imgType + '_') > 0) { //验证原图后缀和压缩后缀格式统一
            var outImgArr = imgUrl.split('.');
            // 最后判断一次是站内jpg/png
            if (outImgArr[outImgArr.length - 1] == imgType) {
                outImgArr[outImgArr.length - 1] = 'webp';
                imgUrl = outImgArr.join('.');
            }
        }
        return imgUrl;
    };

    var animationImgLoad = {
        init: function (callback, errorback) { // 返回一个promise对象
            // 初始化
            ImgUrlTool.init();
            var deferArray = this.createDeferArray();
            return $.when.apply($, deferArray)
        },
        createDeferArray: function () { // return a Array
            var _self = this;
            var deferArray = [];
            var getAllImgDom = $('.J_animation_image_load');
            getAllImgDom.each(function (index, value) {
                var defer = $.Deferred();
                var _img = new Image();
                var $this = $(value);
                var width = $this.attr('suffix-width') || $this.width();
                var isNeedBg = $this.hasClass('J_animation_needbg');
                // 获取处理过的imgSrc
                var imgSrc = ImgUrlTool.getWidthSuffix($this.attr('img-src'), width, ImgUrlTool.isSupportWebp);
                _img.onload = function () {
                    if (!isNeedBg) {
                        $this.append(_img);
                    } else {
                        $this.css('background-image', 'url(' + imgSrc + ')');
                    }
                    defer.resolve(true);
                };
                _img.onerror = function (error) {
                    defer.reject(error);
                };
                _img.src = imgSrc;
                deferArray.push(defer);
            });
            return deferArray;
        }
    }
    return animationImgLoad.init();
});



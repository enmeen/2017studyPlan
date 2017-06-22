/**
 * Created by desen on 2017/6/14.
 */

let module = {
    loadDom: null,
    init: function () {
        let _self = this;
        _self.addLoading();
        _self.isLogger();
    },
    addLoading: function () {
        let _self = this;
        let $body = $('body');
        let tpl = `<p id="desenforloading" style="position: fixed;top:0;left: 0;z-index: 10000;width: 100%;background-color: #42b983;">加载中<p>`;
        $body.append(tpl);
        _self.loadDom = $('#desenforloading');
    },
    deleteLoading: function () {
        let _self = this;
        _self.loadDom.remove();
    },
    isLogger: function () {
        let _self = this;
        let $cube = $('.cube-acm-node');
        let len = $cube.length;
        let acmData, indexData, iidData, extAcmData;
        if (!len) {
            _self.loadDom.text('不存在cube-acm-node');
        } else {
            for (let i = 0, le = len - 1; i < len; i++) {
                let $thisCube = $cube.eq(i);
                acmData = $thisCube.data('log-content');
                indexData = $thisCube.data('log-index');
                iidData = $thisCube.data('log-iid');
                extAcmData = $thisCube.data('ext-acm');
                if (!extAcmData) {//当前dom上不存在点击打点，则在子元素中查找
                    let $aLink = $thisCube.find('a');
                    let jen = $aLink.length;
                    if (jen) {
                        let hasExtAcm = false;
                        for (let j = 0, je = jen - 1; j < je; j++) {
                            if ($aLink.eq(j).data('ext-acm')) {
                                hasExtAcm = true;
                                break;
                            }
                        }
                        if (!hasExtAcm) {
                            console.wran('缺少ext-acm')
                            $thisCube.append(`<p style="position: absolute;top: 10px;left:0;z-index: 100;height: 18px;font-size: 12px;line-height:18px;text-align: center;background-color: #42b983;color: #000">缺少ext-acm</p>`);
                        }
                    } else {
                        console.info('不存在a标签')
                    }
                }
                if (acmData && indexData && iidData) {

                } else {
                    console.warn('曝光打点未添加');
                }
            }
            _self.loadDom.text('处理完成');
        }
    }
}
$(function () {
    module.init();
})

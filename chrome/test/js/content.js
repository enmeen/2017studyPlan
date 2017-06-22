/**
 * Created by desen on 2017/6/5.
 */
let $loading = $('body');
$loading.append(`<p id="desenforloading" style="position: fixed;top:0;left: 0;z-index: 10000;width: 100%;background-color: #42b983;">加载中<p>`)

document.ready = function () {

    /*chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
     console.log(response.farewell);
     });*/


};

$(function () {
    let $node = $('.cube-acm-node');
    let $loadingDom = $('#desenforloading');
    let len = $node.length;
    let acmData, indexData, iidData, extacmData;
    if (len) {
        $loadingDom.remove();
        //$node.append(`<p style="position: absolute;top: 10px;left:0;z-index: 100;height: 18px;font-size: 12px;line-height:18px;text-align: center;background-color: #42b983;color: #000">cube-acm-node</p>`);
        let le = len - 1;
        for (let i = 0; i < le; i++) {
            let thisNode = $node.eq(i);
            acmData = thisNode.data('log-content');
            indexData = thisNode.data('log-index');
            iidData = thisNode.data('log-iid');
            extacmData = thisNode.data('ext-acm');
            if (!extacmData) { //如果当前dom上不存在ext-acm，则在其子元素中查找
                let $a = thisNode.find('a');
                let alen = $a.length;
                if (alen) {
                    let ale = alen - 1;
                    let hasExtAcm = false;
                    for (let j = 0; j < ale; j++) {
                        if ($a.eq(j).data('ext-acm')) {//查找extacm query
                            hasExtAcm = true;
                            break;
                        }
                    }
                    if(!hasExtAcm){
                        console.warn('缺少ext-acm');
                        thisNode.append(`<p style="position: absolute;top: 10px;left:0;z-index: 100;height: 18px;font-size: 12px;line-height:18px;text-align: center;background-color: #42b983;color: #000">缺少ext-acm</p>`);
                    }
                } else { //子元素中没有a标签
                    console.warn('子元素中没有a标签')
                }

            } else {
                if (acmData || indexData || iidData || extacmData) {
                    console.info('打点加入成功')
                }else{
                    console.warn(indexData, iidData, acmData, extacmData)
                }
            }
        }

    } else {
        $loadingDom.text('there is no cube-acm-node class')
    }
})
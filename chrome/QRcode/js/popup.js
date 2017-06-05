/**
 * Created by desen on 2017/6/3.
 */
window.onload=function(){
    chrome.tabs.getSelected(function(tab){
        var qrcode = new QRCode('qrcode-bg', {
            text: tab.url,
            width: 128,
            height: 128,
            /*colorDark : '#000000',
             colorLight : '#ffffff',*/
            correctLevel : QRCode.CorrectLevel.H
        });
        console.log(qrcode);
    });
};
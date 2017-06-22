/**
 * Created by desen on 2017/6/5.
 */

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            // 返回给content.js的数据
            sendResponse({farewell: "goodbye"});

    });
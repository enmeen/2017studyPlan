window.onload=function(){
    var showBox = $('#showbox');
    chrome.tabs.getSelected(function(tab){
        var url = tab.url;
        showBox.html(url);
    });
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
        console.log(response.farewell);
    });
};



function buttonClicked(tab){
    var msg = {
        message: "user clicked!"
      }
      chrome.tabs.sendMessage(tab.id, msg);

}

chrome.browserAction.onClicked.addListener(buttonClicked);
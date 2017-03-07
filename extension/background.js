if (chrome){
    browser = chrome
}

// Called when the user clicks on the browser action.
browser.browserAction.onClicked.addListener(function(tab) {
  browser.runtime.openOptionsPage()
});
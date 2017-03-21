// currently unused.

if (chrome){
    browser = chrome
}

browser.runtime.onInstalled.addListener(function (object) {
    if(object.reason === 'install') {
        browser.tabs.create({url: "http://unpaywall.org/welcome"}, function (tab) {
        });
    }

});
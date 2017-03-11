// currently unused.

if (chrome){
    browser = chrome
}

browser.runtime.onInstalled.addListener(function (object) {
    browser.tabs.create({url: "http://unpaywall.org/welcome"}, function (tab) {
        console.log("New tab launched with http://yoursite.com/");
    });
});
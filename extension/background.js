if (typeof chrome !== "undefined" && chrome){
    browser = chrome
}

browser.runtime.onInstalled.addListener(function (object) {
    console.log("object reason", object)
    if(object.reason === 'install') {
        browser.tabs.create({url: "http://unpaywall.org/welcome"}, function (tab) {
        });
    }

});

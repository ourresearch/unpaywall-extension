if (typeof chrome !== "undefined" && chrome){
    browser = chrome
}

var logUrl = "http://unpaywall.org/log/install";



(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23384030-6']);



function registerInstall(){
    return new Promise(function(resolve, reject) {

        })
}

fetch(logUrl, {method:"GET"}).then(function(resp){
    if (resp.ok){
        resp.json().then(function(json){
            console.log("json is", json)
        })
    }
    else {
        console.log("there was a problem registering the installation!")
    }
})


browser.runtime.onInstalled.addListener(function (object) {

    if(object.reason === 'install') {

        // send Google Analytics events for installation.
        _gaq.push(['_trackEvent', 'Browser Install', "Fx/Chrome"])
        if (navigator.userAgent.indexOf("Firefox") > -1) {
            _gaq.push(['_trackEvent', 'Firefox Install', "Firefox"])
        }
        else if (navigator.userAgent.indexOf("Chrome") > -1) {
            _gaq.push(['_trackEvent', 'Chrome Install', "Chrome"])
        }

        // send the user to the Welcome page:
        browser.tabs.create({url: "http://unpaywall.org/welcome"}, function (tab) {});
    }
});

// when the user clicks on the tab, the contentScript will send up
// a message. when we get that, open the link in a new tab.
browser.runtime.onMessage.addListener(function(msg){
    if (msg.upUrl) {
        browser.tabs.create({
            url: msg.upUrl
        });
    }
});

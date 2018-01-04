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


function showWelcomePage(){
    browser.tabs.create({url: "http://unpaywall.org/welcome"}, function (tab) {});
}

function registerInstall(){
    // send Google Analytics events for installation.
    _gaq.push(['_trackEvent', 'Browser Install', "Fx/Chrome"])
    if (navigator.userAgent.indexOf("Firefox") > -1) {
        _gaq.push(['_trackEvent', 'Firefox Install', "Firefox"])
    }
    else if (navigator.userAgent.indexOf("Chrome") > -1) {
        _gaq.push(['_trackEvent', 'Chrome Install', "Chrome"])
    }

    // check the server to make sure we are good to show the welcome screen
    fetch(logUrl, {method:"POST", body:{}}).then(function(resp){
        if (resp.ok){
            resp.json().then(function(json){
                console.log("got back data from /log/install", json)
                if (json.show_welcome_screen) {
                    showWelcomePage()
                }
                else {
                    // do nothing. this is the only condition
                    // where we DON'T show the welcome page.
                    console.log("the server told us to hide the welcome page, so we are.")
                }
            })
        }
        else {
            showWelcomePage()
        }
    })
        .catch(function(){
            showWelcomePage()
        })



}



browser.runtime.onInstalled.addListener(function (object) {
    if(object.reason === 'install') {
        registerInstall()
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

if (typeof chrome !== "undefined" && chrome){
    browser = chrome
}

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23384030-6']);



// this is currently not working for firefox.
browser.runtime.onInstalled.addListener(function (object) {
    console.log("object reason", object)
    if(object.reason === 'install') {
        _gaq.push(['_trackEvent', 'Chrome Install', "Chrome"])
        browser.tabs.create({url: "http://unpaywall.org/welcome"}, function (tab) {});
    }
});

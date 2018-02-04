if (typeof chrome !== "undefined" && chrome){
    browser = chrome
}

var logUrl = "http://unpaywall.org/log/install";


function showWelcomePage(){
    browser.tabs.create({url: "http://unpaywall.org/welcome"}, function (tab) {});
}

function checkToShowWelcomePage(){
    // check the server to make sure we are good to show the welcome screen
    fetch(logUrl, {method:"POST", body:{}}).then(function(resp){
        if (resp.ok){
            resp.json().then(function(json){
                if (json.show_welcome_screen) {
                    showWelcomePage()
                }
                else {
                    // do nothing. this is the only condition
                    // where we DON'T show the welcome page.
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
        checkToShowWelcomePage()
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

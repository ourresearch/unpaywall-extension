if (typeof chrome !== "undefined"){
    browser = chrome
}

var parts = window.name.split("#")
var color = parts[0]
var url = decodeURI(parts.slice(1).join('#'))

$(".button")
    .fadeIn()
    .click(function(){
        // todo: replace this scary alert with a message up to the
        // unpaywall.js content script, which can then pop up
        // a prettier and mre useful dialog box.
        if (color == "black") {
            alert("The Unpaywall extension " +
            "couldn't find any legal open-access version of this article.");
        }
        else {
            // send a message to the extension, so it can open this url
            // in a new tab
            browser.runtime.sendMessage({"upUrl": url});
        }
    })

$(".button").addClass(color)

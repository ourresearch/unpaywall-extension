if (typeof chrome !== "undefined"){
    browser = chrome
}

var parts = window.name.split("#")
var color = parts[0]
var url = decodeURI(parts[1])

$(".button")
    .fadeIn()
    .click(function(){
        window.open(url)

        // todo: replace this scary alert with a message up to the
        // unpaywall.js content script, which can then pop up
        // a prettier and mre useful dialog box.
        if (color == "black") {
            alert("The Unpaywall extension " +
            "couldn't find any legal open-access version of this article.");
        }
    })

$(".button").addClass(color)

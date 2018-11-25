
if (chrome){
    browser = chrome
}


document.getElementById("options").addEventListener("click",
    function(){
        browser.runtime.openOptionsPage()
    }
)

document.getElementById("homepage").addEventListener("click",
    function(){
        browser.tabs.create({url: "https://unpaywall.org/faq"})
    }
)

document.getElementById("example").addEventListener("click",
    function(){
        browser.tabs.create({url: "https://unpaywall.org/welcome"})
    }
)


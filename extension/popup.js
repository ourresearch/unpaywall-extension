
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
        browser.tabs.create({url: "http://unpaywall.org?faq"})
    }
)


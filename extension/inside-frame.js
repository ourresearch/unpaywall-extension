$(".button.success")
    .fadeIn()
    .click(function(){
        devLog("click on the iframe button!")
        parent.postMessage({
            unpaywall: "go-to-pdf"
        }, "*")
    })

$(".button").addClass(window.name)

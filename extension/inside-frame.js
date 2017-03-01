$(".button.success")
    .fadeIn()
    .click(function(){
        parent.postMessage({
            unpaywall: "go-to-pdf"
        }, "*")
    })

$(".button").addClass(window.name)

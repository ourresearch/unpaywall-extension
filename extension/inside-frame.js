var devMode = true
var devLog = function(str, obj){
    if (devMode){
        console.log("unpaywall: " + str, obj)
    }
}

window.addEventListener("message", receiveMessage, false);
function receiveMessage(msg){
    if  (msg.data.unpaywall == "success"){
        devLog("success")
        $("body")
            .addClass("success")
            .addClass("finished")
            .removeClass("loading")
            .click(function(){
                devLog("click!", msg.data.unpaywall.url)
                parent.postMessage({
                    unpaywall: "go-to-pdf"
                }, "*")
            })
    }


}
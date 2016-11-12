var devMode = true
var devLog = function(str, obj){
    if (devMode){
        console.log("getpdf: " + str, obj)
    }
}

window.addEventListener("message", receiveMessage, false);
function receiveMessage(msg){
    if  (msg.data.getpdf == "success"){
        devLog("success")
        $("body")
            .addClass("success")
            .addClass("finished")
            .removeClass("loading")
            .click(function(){
                devLog("click!", msg.data.getpdf.url)
                parent.postMessage({
                    getpdf: "go-to-pdf"
                }, "*")
            })
    }


}
var devMode = true
var devLog = function(str, obj){
    if (devMode){
        console.log("getpdf: " + str, obj)
    }
}
devLog("i am running inside the frame!")

window.addEventListener("message", receiveMessage, false);
function receiveMessage(msg){
    if (msg.data.getpdf == "finished"){
        devLog("finished")
        $("body").addClass("finished").removeClass("loading")
    }
    else if  (msg.data.getpdf == "success"){
        devLog("success")
        $("body").addClass("success")

    }
    else if (msg.data.getpdf == "failure"){
        devLog("failure")
        $("body").addClass("failure")

    }

}
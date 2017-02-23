console.log("i am the unpaywall main extension.")

var devMode = true;

var doiMetaNames = [
    "citation_doi",
    "doi",
    "dc.doi",
    "dc.identifier",
    "dc.identifier.doi",
    "bepress_citation_doi",
    "rft_id"
]

var devLog = function(str, obj){
    if (devMode){
        console.log("unpaywall: " + str, obj)
    }
}


function createIframe(){
    var iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('unpaywall.html');

    // styles
    iframe.style.height = "80px";
    iframe.style.width = '80px';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.top = '33%';
    iframe.scrolling = 'no';
    iframe.style.border = '0';
    iframe.style.zIndex = '9999999999';
    iframe.style.display = 'none;'
    iframe.id = "unpaywall";

    //bodyStyle = document.body.style;
    //cssTransform = 'transform' in bodyStyle ? 'transform' : 'webkitTransform';
    //position = message.iframe_position;

    return iframe
}



function findDoi(){
    var doi

    // look in the meta tags
    $("meta").each(function(i, myMeta){

        // has to be a meta name likely to contain a DOI
        if (doiMetaNames.indexOf(myMeta.name.toLowerCase()) < 0) {
            return // continue iterating
        }
        // content has to look like a  DOI.
        // much room for improvement here.
        var doiCandidate = myMeta.content.replace("doi:", "").trim()
        if (doiCandidate.indexOf("10.") === 0) {
            doi = doiCandidate
        }
    })

    if (doi){
        return doi
    }

    // look in the document string
    var docAsStr = document.documentElement.innerHTML;

    // ScienceDirect pages
    // http://www.sciencedirect.com/science/article/pii/S1751157709000881
    var scienceDirectRegex = /SDM.doi\s*=\s*'([^']+)'/;
    var m = scienceDirectRegex.exec(docAsStr)
    if (m && m.length > 1){
        devLog("found a ScienceDirect DOI", m)
        return m[1]
    }

    // sniff doi from the altmetric.com widget.
    // not done yet...improve regex
    var altmetricWidgetDoi = /data-doi\s*=\s*'([^']+)'/;


    return null
}

var showTab = function(apiResp) {
    if (apiResp.oa_color != "green"){
        devLog("this isn't Green OA. Quitting.")
        return false
    }

    var currentUrl = new URL(window.location)
    var redirectUrl = new URL(apiResp.free_fulltext_url)
    if (currentUrl.hostname == redirectUrl.hostname){
        devLog("Looks like we are already on the Green OA source for this article.")
        return false
    }

    return true
}



var loadIframe = function(myIframe){
    var url = "https://api.oadoi.org/" + doi
    myIframe.onload = function(){

        $.get(url, function(data){
            var resp = data.results[0]
            devLog("got oaDOI info back", resp)

            if (showTab(resp)) {

                // we can't modify the iframe, so send the good news
                // down as a message
                myIframe.contentWindow.postMessage({
                    unpaywall: "success"
                }, "*")

                // we can't tell when someone clicks on the iframe,
                // so we have to listen to message sent from it.
                window.addEventListener("message", function(msg){
                    if (msg.data.unpaywall == "go-to-pdf"){
                        devLog("go to pdf", resp.free_fulltext_url)
                        window.location = resp.free_fulltext_url
                    }
                }, false);
            }
            else {
                $("#unpaywall").fadeOut()
            }
        })
    }

}



// procedural code
var doi = findDoi()
if (doi){
    devLog("we have a doi!", doi)
    var myIframe = createIframe()
    document.documentElement.appendChild(myIframe);
    loadIframe(myIframe)
}











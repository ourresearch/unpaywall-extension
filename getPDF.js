console.log("i am the getPDF main extension.")

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
        console.log("getpdf: " + str, obj)
    }
}


function injectIframe(){
    var iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('getpdf.html');

    // styles
    iframe.style.height = "45px";
    iframe.style.width = '45px';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.top = '33%';
    iframe.scrolling = 'no';
    iframe.style.border = '0';
    iframe.style.zIndex = '9999999999';
    iframe.style.display = 'none;'
    iframe.id = "getpdf";

    //bodyStyle = document.body.style;
    //cssTransform = 'transform' in bodyStyle ? 'transform' : 'webkitTransform';
    //position = message.iframe_position;

    document.documentElement.appendChild(iframe);
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





var myIframe = injectIframe()
myIframe.onload = function(){
    var $iframe = $("#getpdf")
    var doi = findDoi()
    if (!doi){
        //$("#getpdf-button").fadeOut(250)
        devLog("no doi.")
        return
    }

    $iframe.fadeIn()


    devLog("we have a doi!", doi)
    var url = "https://api.oadoi.org/" + doi
    $.get(url, function(data){
        var resp = data.results[0]
        devLog("got oaDOI info back", resp)


        myIframe.contentWindow.postMessage({
            getpdf: "finished"
        }, "*")

        // set the link
        if (resp.free_fulltext_url) {
            myIframe.contentWindow.postMessage({
                getpdf: "success"
            }, "*")
        }
        else {
            myIframe.contentWindow.postMessage({
                getpdf: "failure"
            }, "*")
        }

        // set the source of the PDF
        //if (resp.oa_color == "gold"){
        //    $("#getpdf-button").addClass("pdf-from-here")
        //}
    })
}








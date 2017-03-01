console.log("i am the unpaywall main extension.")

var devMode = true;


// global variables:
var iframe = document.createElement('iframe');
var results = {
    pdfScrape: {
        url: undefined,
        isComplete: false,
        color: undefined
    },
    oadoi: {
        url: undefined,
        isComplete: false,
        color: undefined
    }
}
var iframeIsInserted = false



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



function findPdfUrl(){

    // todo massively improve PDF link detection.
    // step one: bring in all the code from
    // https://github.com/Impactstory/articlepage/blob/master/article_page.py
    // as this is well tested and gets oodles of instances.
    //
    // step two is bring in code from zotero translators
    //
    // for now though this will get enough to be interesting, as the <meta>
    // approach is the most common one from publishers.

    var pdfUrl;

    //  look in the <meta> tags
    // same thing, but look in  <link> tags
    $("meta").each(function(i, elem){
        if (elem.name == "citation_pdf_url") {
            pdfUrl = elem.content
            return false; // stop iterating, we found what we need
        }
    })

    // todo look in <link> tags as well

    return pdfUrl
}


function insertIframe(name){
    if (iframeIsInserted){
        return false // already done, let's quit.
    }
    
    devLog("inserting iframe, based on these results:", results)
    iframe.src = chrome.extension.getURL('unpaywall.html');
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

    // set a custom name
    iframe.name = name

    document.documentElement.appendChild(iframe);
    iframeIsInserted = true
}

//function postSuccessMsg(msg){
//    iframe.contentWindow.postMessage({
//        unpaywall: "success"
//    }, "*")
//}

function followTabClick(){
    // we can't tell when someone clicks on the iframe,
    // so we have to listen to message sent from it.
    window.addEventListener("message", function(msg){
        if (msg.data.unpaywall == "go-to-pdf"){
            devLog("go to pdf", resp.free_fulltext_url)
            window.location = resp.free_fulltext_url
        }
    }, false);
}


function doPdfScrape(){
    var pdfUrl = findPdfUrl()
    if (!pdfUrl){
        result.pdfScrape.isComplete = true
        return false
    }

    devLog("doing PDF scrape on this URL", pdfUrl)

    // ok, we've got a PDF URL. Let's see if it's open.

    var xhr = new XMLHttpRequest()
    xhr.open("GET", pdfUrl, true)
    xhr.onprogress = function () {
        //devLog("HEADERS:", xhr.getAllResponseHeaders())
        var contentType = xhr.getResponseHeader("Content-Type")

        if (contentType){
            results.pdfScrape.isComplete = true
            xhr.abort()

            if (contentType.indexOf("pdf") > -1){
                results.pdfScrape.url = pdfUrl
                results.pdfScrape.color = "gold"
            }
        }
    }
    xhr.send()
}

function doOadoi(){
    var doi = findDoi()
    var url = "https://api.oadoi.org/" + doi + "?email=team@unpaywall.org"
    devLog("doing oaDOI check", url)

    $.get(url, function(data){
        results.oadoi.isComplete = true
        var resp = data.results[0]
        if (resp.oa_color){
            results.oadoi.color = resp.oa_color  // green or gold
            results.oadoi.url = resp.free_fulltext_url
        }
    })
}

function checkResults(){
    //devLog("checking results....", results)

    // once all the results are in, we can do stuff
    if (results.pdfScrape.isComplete && results.oadoi.isComplete){

        // locally scraped pdf gets priority
        if (results.pdfScrape.color == 'gold'){
            insertIframe("gold")
            return true
        }

        // if no scraped PDF, use the oaDOI response
        if (results.oadoi.color) {
            insertIframe(results.oadoi.color)
            return true
        }
    }

    return false

}

function goToFulltext(){
    var newLoc

    if (results.pdfScrape.url){
        newLoc = results.pdfScrape.url
    }

    // if we want to, we can keep the user on the same page here, depending
    // on the color of oa we are dealing with...no need to reload the page
    // if the url is just pointing to this same spot, for instance.
    else if (results.oadoi.url){
        newLoc = results.oadoi.url
    }
    else {
        // shouldn't ever get here, since the button only appears
        // when there's a fulltext url somewhere.
    }

    devLog("sending user to new fulltext URL: " + newLoc, results)
    window.location = newLoc
}





// procedural code
var doi = findDoi()
if (doi){
    devLog("we have a doi!", doi)

    // these run in parallel:
    doOadoi()
    doPdfScrape()

    // todo start polling
    setInterval(checkResults, 500)


    // we can't tell when someone clicks on the iframe,
    // so we have to listen to message sent from it.
    window.addEventListener("message", function(msg){
        if (msg.data.unpaywall == "go-to-pdf"){
            goToFulltext()
        }
    }, false);


}











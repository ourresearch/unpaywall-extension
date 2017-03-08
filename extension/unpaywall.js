console.log("i am the unpaywall main extension.")

var devMode = true;
if (chrome){
    browser = chrome
}

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
var settings = {}




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

    // make sure we are not inserting iframe again and again
    if (iframeIsInserted){
        return false
    }
    
    devLog("inserting iframe, based on these results:", results)
    iframe.src = browser.extension.getURL('unpaywall.html');

    iframe.style.height = "50px";
    iframe.style.width = '50px';
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





function doPdfScrape(){
    var pdfUrl = findPdfUrl()
    if (!pdfUrl){
        results.pdfScrape.isComplete = true
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

    // so it's important to mark this done even if something goes wrong,
    // or we'll never make a decision to show the Green OA tab even if we find green. Eg:
    // https://link.springer.com/article/10.1023%2FB%3AMACH.0000011805.60520.fe
    // redirects to http download server, which throws error (needs to be https).
    xhr.onerror = function(){
        results.pdfScrape.isComplete = true
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

function resolvesToCurrentHost(url){
    var currentUrl = new URL(window.location)
    var oadoiUrl = new URL(url)
    return currentUrl.hostname == oadoiUrl.hostname
}


function decideTabColor(){
    //devLog("checking results....", results)


    // if all the results aren't in, we can't make decisions. quit.
    if (!(results.pdfScrape.isComplete && results.oadoi.isComplete)){
        return
    }

    // if the settings aren't loaded, quit
    if (typeof settings.showOaColor == "undefined") {
        return
    }


    // the decision on how to assign tab color is a bit complicated.
    // it's layed out below as a set of steps, arranged in order of preference.
    // if we get a hit on any step, we select a color and then quit.
    var color

    // 1. if it's gold OA, we want to make sure we show that, so it's at the top
    if (results.oadoi.color == "gold") {
        color = "gold"
    }


    // 2. if we scraped a PDF from this page, it may be that the user is browsing
    // from campus/VPN and they have lib-purchased access,
    // or it may be a hybrid article that OA didn't realize was gold. either way
    // it's more likely to please the user than the Green OA copy, so we send it.
    else if (results.pdfScrape.url){
        color = "blue"
    }

    // 3. green is the trickiest. sometimes (PMC most notably) the Green
    // repository page has DOI metadata on it. unpaywall will pick that up,
    // send it to oaDOI, and get a link to the green page it's
    // already on. that's useless. so don't show the tab at all if we're already
    // on the same page we're going to link to.
    else if (results.oadoi.color == "green" && !resolvesToCurrentHost(results.oadoi.url)) {
        color = "green"
    }

    // alas, we couldn't find any OA for this. but we want to show a tab anyway, because
    // that way the user knows the extension is actually there and working.
    // this could get annoying, but is requested by beta testers now.
    // in future, we could control with a config.
    else {
        color = "black"
    }


    // ok now we need to decide what color to return, based on
    // the users-selected showOaColor setting

    // if the user likes to dive into the nerdy details of what kind of OA is what,
    // great, let's show em what we found.
    if (settings.showOaColor){
        return color
    }

    // but for most users, they just want to know if they can read it. for them,
    // Green Means Go.
    else {
        if (color != "black") {
            return "green"
        }
        else {
            return "black"
        }
    }

}

function goToFulltext(){
    var newLoc

    if (results.pdfScrape.url){
        newLoc = results.pdfScrape.url
    }
    else if (results.oadoi.url){
        newLoc = results.oadoi.url
    }
    else {
        alertify.alert("The Unpaywall extension " +
            "couldn't find any legal open-access version of this article.");
    }

    if (newLoc){
        devLog("sending user to new fulltext URL: " + newLoc, results)
        window.location = newLoc
    }
}

function loadSettings(){
    browser.storage.local.get({
        showOaColor: false
    }, function(items) {
        console.log("got back stuff from showOaColor", items)
        settings.showOaColor = items.showOaColor;
    });
}





// procedural code
var doi = findDoi()

// the meat of the extension does not run unless we find a DOI
if (doi){
    devLog("we have a doi!", doi)

    // these run in parallel:
    loadSettings()
    doOadoi()
    doPdfScrape()

    // poll, waiting for all our data to be collected. once it is,
    // make a call and inject the iframe, then quit.
    var resultsChecker = setInterval(function(){
        devLog("checking results...")
        var tabColor = decideTabColor()
        if (tabColor){
            insertIframe(tabColor)
            clearInterval(resultsChecker) // stop polling
        }
    }, 250)


    // we can't tell when someone clicks on the iframe,
    // so we have to listen to message sent from it.
    window.addEventListener("message", function(msg){
        if (msg.data.unpaywall == "go-to-pdf"){
            goToFulltext()
        }
    }, false);


}











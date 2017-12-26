
if (chrome){
    browser = chrome
}

var devLog = function(str, obj){
    if (settings && settings.showOaColor){
        console.log("unpaywall: " + str, obj)
    }
}
devLog("unpaywall is running")

// global variables:
var iframeIsInserted = false
var settings = {}
var myHost = window.location.hostname
var allSources = []
var doi
var docAsStr = document.documentElement.innerHTML;










/***********************************************************************************
 *
 * Sources
 *
 ************************************************************************************/


function makeSourceObj(sourceName, sourceFn) {
    var results = {
        url: undefined,
        isStarted: false,
        isComplete: false,
        color: undefined,
        isPublisherHosted: undefined,
        isOaJournal: undefined
    }

    return {
        results: results,
        name: sourceName,
        isComplete: function(){
          return results.isComplete
        },
        isStarted: function(){
          return results.isStarted
        },
        run: function(){
            results.isStarted = true
            sourceFn(results)
        }
    }
}



function makeAllSources(){
    allSources.push(makeSourceObj("pdfLink", runPdfLink))
    allSources.push(makeSourceObj("oadoi", runOadoi))
}


function numSourcesStarted(){
    var ret = 0
    allSources.forEach(function(source){
        if (source.isStarted()){
            ret += 1
        }
    })
    return ret
}


function startSearches(){
    makeAllSources()
    allSources.forEach(function(source){
        if (!source.isStarted()){
            source.run()
        }
    })
}

function searchesAreAllDone(){
    return getSource("pdfLink").isComplete() && getSource("oadoi").isComplete()
}


function getSearchResults(){
    if (!searchesAreAllDone()){
        return null
    }
    var res = getSource("oadoi").results

    // the local PDF url overwrites the oaDOI URL
    if (getSource("pdfLink").results.url){
        res.url = getSource("pdfLink").results.url
    }

    if (searchesAreAllDone()){
        return {
            color: decideTabColor(res),
            url: res.url
        }
    }

    return null
}








function runPdfLink(resultObj){
    var pdfUrl = findPdfUrl()
    if (!pdfUrl){
        resultObj.isComplete = true
        return false
    }

    devLog("checking PDF link: ", pdfUrl)
    checkForPdf(pdfUrl).then(function(){
        resultObj.isComplete = true
        resultObj.url = pdfUrl
        devLog("PDF check done. success! PDF link:", pdfUrl)
    }, function(err){
        devLog("PDF check done. failure. useless link: ", pdfUrl)
        resultObj.isComplete = true
    });
}







function runOadoi(resultObj){
    var url = "https://api.oadoi.org/v2/" + doi + "?email=unpaywall@impactstory.org"
    devLog("doing oaDOI check", url)


    $.getJSON(url)
        .done(function(resp){
            devLog("oaDOI returned: ", resp)

            // if it's got a best_oa_location it has a URL. cool, we'll return that in the
            // results object.
            if (resp.best_oa_location){
                resultObj.url = resp.best_oa_location.url
                resultObj.hostType = resp.best_oa_location.host_type
                resultObj.isOaJournal = resp.journal_is_oa
            }
        })
        .fail(function(resp){
            devLog("oaDOI call failed", resp)
        })
        .always(function(resp){
            resultObj.isComplete = true
        })

}



function getSource(sourceName){
    var ret
    allSources.forEach(function(source){
        if (source.name == sourceName) {
            ret = source
        }
    })
    return ret
}



function decideTabColor(myResults){

    var color = "black"

    if (myResults.url){
        color = "bronze"
    }

    if (myResults.hostType == "repository") {
        color = "green"
    }
    else if (myResults.isOaJournal){
        color = "gold"
    }

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
















/***********************************************************************************
 *
 *  Page scraping functions, for DOIs and PDF links
 *
 ************************************************************************************/


function runRegexOnDoc(re, host){
    // @re regex that has a submatch in it that we're searching for, like /foo(.+?)bar/
    // @host optional. only work on this host.

    if (!host || host == myHost){
        var m = re.exec(docAsStr)
        if (m && m.length > 1){
            return m[1]
        }
    }
    return false
}


// most scholarly articles have some kind of DOI meta
// tag in the head of the document. Check these.
function findDoiFromMetaTags(){
    var doi

    // collection of the various ways different publishers may
    // indicate a given meta tag has the DOI.
    var doiMetaNames = [
        "citation_doi",
        "doi",
        "dc.doi",
        "dc.identifier",
        "dc.identifier.doi",
        "bepress_citation_doi",
        "rft_id",
        "dcsext.wt_doi"
    ];

    $("meta").each(function(i, myMeta){
        if (!myMeta.name){
            return true // keep iterating
        }

        // has to be a meta name likely to contain a DOI
        if (doiMetaNames.indexOf(myMeta.name.toLowerCase()) < 0) {
            return true // continue iterating
        }

        // SAGE journals have weird meta tags with scheme="publisher-id"
        // those DOIs have strange character replacements in them, so ignore.
        // making universal rule cos i bet will help some other places too.
        // eg:
        //      http://journals.sagepub.com/doi/10.1207/s15327957pspr0203_4
        //      http://journals.sagepub.com/doi/abs/10.1177/00034894991080S423
        if (myMeta.scheme && myMeta.scheme != "doi") {
            return true // continue iterating
        }

        // content has to look like a  DOI.
        // much room for improvement here.
        var doiCandidate = myMeta.content.replace("doi:", "").trim()
        if (doiCandidate.indexOf("10.") === 0) {
            doi = doiCandidate
        }
    })

    if (!doi){
        return null
    }
    devLog("found a DOI from a meta tag", doi)

    // all done.
    return doi
}


// sniff DOIs from the altmetric.com widget.
function findDoiFromDataDoiAttributes(){

    var dataDoiValues =  $("*[data-doi]").map(function(){
        return this.getAttribute("data-doi")
    }).get()


    // if there are multiple unique DOIs, we're on some kind of TOC page,
    // we don't want none of that noise.
    var numUniqueDois = new Set(dataDoiValues).size
    if (numUniqueDois === 1){
        devLog("found a DOI from a [data-doi] attribute")
        return dataDoiValues[0]
    }
}

// ScienceDirect
// eg: http://www.sciencedirect.com/science/article/pii/S1751157709000881 (green)
// eg: http://www.sciencedirect.com/science/article/pii/S0742051X16306692
function findDoiFromScienceDirect() {
    if (myHost.indexOf("sciencedirect") < 0) {
        return
    }
    var doi

    // the old version of ScienceDirect requires a hack to read DOI from js var
    doi = runRegexOnDoc(/SDM.doi\s*=\s*'([^']+)'/)
    if (doi) {
        return doi
    }

    // the new React-based version of ScienceDirect pages
    var doiLinkElem = $("a[class='doi']")
    if (doiLinkElem.length){
        var m = doiLinkElem[0].innerHTML.match(/doi\.org\/(.+)/)
        if (m && m.length > 1){
            return m[1]
        }
    }

}

function findDoiFromIeee(){
    // green:   http://ieeexplore.ieee.org/document/6512846/
    // thanks to @zuphilip for a PR to get this started.
    return runRegexOnDoc(/"doi":"([^"]+)"/, "ieeexplore.ieee.org")
}

function findDoiFromNumber(){
    // green:   http://www.nber.org/papers/w23298.pdf
    return runRegexOnDoc(/Document Object Identifier \(DOI\): (10.*?)<\/p>/, "www.nber.org")
}

function findDoiFromPubmed(){
    // gold:   https://www.ncbi.nlm.nih.gov/pubmed/17375194

    if (myHost.indexOf("www.ncbi.nlm.nih.gov") < 0) {
        return
    }

    var doiLinkElem = $("a[ref='aid_type=doi']")
    if (doiLinkElem.length){
        return doiLinkElem[0].innerHTML
    }
}

function findDoiFromPsycnet(){
    if (myHost == "psycnet.apa.org") {
        var re = /&doi=(.+)/
        var m = re.exec(window.location.href)
        if (m && m.length > 1){
            return m[1]
        }
    }
    return false
}


function findDoi(){
    // we try each of these functions, in order, to get a DOI from the page.
    var doiFinderFunctions = [
        findDoiFromMetaTags,
        findDoiFromDataDoiAttributes,
        findDoiFromScienceDirect,
        findDoiFromIeee,
        findDoiFromNumber,
        findDoiFromPsycnet,
        findDoiFromPubmed
    ]

    for (var i=0; i < doiFinderFunctions.length; i++){
        var myDoi = doiFinderFunctions[i]()
        if (myDoi){
            // if we find a good DOI, stop looking
            return myDoi
        }
    }
}


function findPdfUrl(){

    // later: massively improve PDF link detection.

    var pdfUrl;


    //  look in the <meta> tags
    // same thing, but look in  <link> tags
    $("meta").each(function(i, elem){
        if (elem.name == "citation_pdf_url") {
            pdfUrl = elem.content
            return false; // stop iterating, we found what we need
        }
    })

    // there are also some links to PDFs in the HTML <head>, in tags
    // called <link> (not hyperlinks, <link> tags).


    // look in the markup itself. most of these will be pretty narrowly scoped
    // to a particular publisher.

    var $links = $("a")
    $links.each(function(i, link){
        // iterate through all the links. returning False stops the loop.

        var $link = $(link)

        // http://www.nature.com/nature/journal/v536/n7617/full/nature19106.html
        if (/\/nature\/journal(.+?)\/pdf\/(.+?)\.pdf$/.test(link.href)) {
            pdfUrl = link.href
            return false
        }

        // http://www.nature.com/articles/nmicrobiol201648
        if (/\/articles\/nmicrobiol\d+\.pdf$/.test(link.href)) {
            pdfUrl = link.href
            return false
        }

        // NEJM
        // open: http://www.nejm.org/doi/10.1056/NEJMc1514294
        // closed: http://www.nejm.org/doi/full/10.1056/NEJMoa1608368
        if (link.getAttribute("data-download-content") == "Article") {
            pdfUrl = link.href
            return false
        }

        // Taylor & Francis Online
        if (myHost == "www.tandfonline.com") {
            // open: http://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108
            // closed: http://www.tandfonline.com/doi/abs/10.1198/tas.2011.11160
            if (/\/doi\/pdf\/10(.+?)needAccess=true$/i.test(link.href)){
                pdfUrl = link.href
                return false
            }
        }

        //  The Journal of Clinical Endocrinology & Metabolism
        if (myHost == "http://press.endocrine.org") {
            // not sure if we should handle this one or not. it's on an old version of
            // their website

        }

        // Centers for Disease Control
        if (myHost == "www.cdc.gov") {
            // open https://www.cdc.gov/mmwr/volumes/65/rr/rr6501e1.htm
            if (link.classList[0] == "noDecoration" && /\.pdf$/.test(link.href)){
                pdfUrl = link.href
                return false
            }
        }

        // ScienceDirect
        if (myHost == "www.sciencedirect.com"){
            // open: http://www.sciencedirect.com/science/article/pii/S0360131517300726
            if (link.getAttribute("pdfurl")){
                pdfUrl = link.getAttribute("pdfurl")
                return false
            }

        }


    })


    // look in the actual text of the page. has to be done when publishers
    // hide metadata in JS vars
    // IEEE Explore. always has a pdf link, whether closed or not.
    // finds a pdf: http://ieeexplore.ieee.org/document/7169508/
    var ieeePdf = runRegexOnDoc(/"pdfPath":"(.+?)\.pdf",/, "ieeexplore.ieee.org")
    if (ieeePdf){
        pdfUrl = "http://ieeexplore.ieee.org" + ieeePdf + ".pdf"
    }

    return pdfUrl
}


function checkForPdf(pdfUrl){
    return new Promise(function(resolve, reject){
        if (pageSaysPdfIsFree()){
            devLog("page says the PDF is free. good enough for us.")
            resolve()
        }
        else {
            downloadPdf(pdfUrl).then(function(resp){
                resolve(resp)
            }, function(err){
                reject(err)
            })
        }

    })
}


function pageSaysPdfIsFree(){
    // We don't always need to try to download the PDF to make sure it's free.
    // Sometimes we can infer it from page characteristics.
    // Here's where we put all those rules.

    var tests = [
        function(){
            // gold: http://ieeexplore.ieee.org/document/7169508/
            // not gold: http://ieeexplore.ieee.org/document/6512846/
            return !!runRegexOnDoc(/"(isOpenAccess":true,)/, "ieeexplore.ieee.org")
        },
        function(){
            // this whole journal should be gold, but our PDF download tests fails
            // because of mixed http and https hosting.

            // gold: https://jlsc-pub.org/articles/abstract/10.7710/2162-3309.2190/
            return !!runRegexOnDoc(/(citation_pdf_url)/, "jlsc-pub.org")
        }
    ]


    var anyTestsPass = tests.some(function(myTest){
        return myTest()
    })

    return anyTestsPass
}


// used by sources that need to check to make sure a link to a PDF
// really gets you a legit pdf.
function downloadPdf(pdfUrl){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest()
        xhr.open("GET", pdfUrl, true)
        xhr.onprogress = function () {
            var contentType = xhr.getResponseHeader("Content-Type")
            //devLog("HEADERS:", xhr.getAllResponseHeaders())

            if (contentType){
                xhr.abort()
                if (contentType.indexOf("pdf") > -1){
                    resolve()  // it's a PDF
                }
                else {
                    reject()  // not a PDF
                }
            }
        }
        // so it's important to mark this done even if something goes wrong,
        // or we'll never make a decision to show the Green OA tab even if we find green. Eg:
        // https://link.springer.com/article/10.1023%2FB%3AMACH.0000011805.60520.fe
        // redirects to http download server, which throws error (needs to be https).
        xhr.onerror = function(){
            reject()  // it's not a pdf
        }
        xhr.send()

    })
}












/***********************************************************************************
 *
 *  utility and UX functions
 *
 ************************************************************************************/


function insertIframe(name, url){
    var iframe = document.createElement('iframe');

    // make sure we are not inserting iframe again and again
    if (iframeIsInserted){
        return false
    }

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

    // set a custom name and URL
    iframe.name = name + "#" + encodeURI(url)

    document.documentElement.appendChild(iframe);
    iframeIsInserted = true
}


function reportInstallation(){
    // this is so the unpaywall.org/welcome page knows that this user
    // has actually installed the extension.
    var loc = window.location.host
    if (loc.indexOf("unpaywall.org") === 0){
        devLog("installed. adding reporting div.")
        $("<div style='display:none' id='unpaywall-is-installed'></div>")
            .appendTo("body")
    }
}














/***********************************************************************************
 *
 *  main method
 *
 ************************************************************************************/



function run() {
    reportInstallation()
    doi = findDoi() // setting this globally.

    // the meat of the extension does not run unless we find a DOI
    if (!doi){
        return
    }
    devLog("we have a doi!", doi)
    startSearches()


    // poll, waiting for all our data to be collected. once it is,
    // make a call and inject the iframe, then quit.
    var resultsChecker = setInterval(function(){
        var searchResults = getSearchResults()
        if (searchResults){
            insertIframe(searchResults.color, searchResults.url)
            clearInterval(resultsChecker) // stop polling
        }
    }, 250)
}


function runForPubmedSerp(){
    // unfinished

    devLog("runnning for pubmed serp")
    if (myHost.indexOf("www.ncbi.nlm.nih.gov") < 0) {
        return
    }

    $("div.rprt").each(function(i, searchResult){
        console.log("pubmed result", searchResult)

        var $res = $(searchResult)

        var details = $res

        var linkStr = "<a href='http://impactstory.org'>free via Unpaywall</a>"

        $(searchResult).find("div.resc").append(linkStr)

        console.log("new pubmed result", this)


    })

}

function runWithSettings(){
    browser.storage.local.get(null, function(items){
        settings = items
        devLog("got settings", settings)
        run()
        //runForPubmedSerp()
    });
}


// on firefox, jquery sometimes loads after this script. give it
// some time to load before we run anything on this page.
setTimeout(runWithSettings, 200)


















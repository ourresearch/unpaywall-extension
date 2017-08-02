var ignoreCache = false;
//ignoreCache = true


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


var gsFailDois = [
    "10.1016/j.tcb.2014.11.005",
    "10.1038/pcan.2016.56"
]







/***********************************************************************************
 *
 * Sources
 *
 ************************************************************************************/


function makeSourceObj(descr) {
    var results = {
        url: undefined,
        isStarted: false,
        isComplete: false,
        color: undefined
    }

    return {
        results: results,
        name: descr[0],
        isComplete: function(){
          return results.isComplete
        },
        isStarted: function(){
          return results.isStarted
        },
        run: function(){
            results.isStarted = true
            var myFn = descr[1]
            myFn(results)
        }
    }
}


fulltextSourceFns = [
    ["pdfLink", runPdfLink],
    ["oadoi", runOadoi],
    ["googleScholar", runGoogleScholar]
]

function makeAllSources(){
    fulltextSourceFns.forEach(function(sourceDescription){
        var mySourceObj = makeSourceObj(sourceDescription)
        allSources.push(mySourceObj)
    })
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


function extendResultObj(resultObj, url, color){
    resultObj.isComplete = true
    resultObj.url = url
    resultObj.color = color
    return resultObj
}




function getSearchResults(){

    // start search step one
    if (numSourcesStarted() === 0){
        makeAllSources()

        getSource("pdfLink").run()
        getSource("oadoi").run()
    }

    // search step one is done
    if (getSource("pdfLink").isComplete() && getSource("oadoi").isComplete()){

        if (getFulltextUrl()){
            return {
                color: decideTabColor(),
                url: getFulltextUrl()
            }
        }

        // start search step two
        if (!getSource("googleScholar").isStarted()) {
            getSource("googleScholar").run()
        }
    }

    // search step two is done
    if (getSource("googleScholar").isComplete()){
        return {
            color: decideTabColor(),
            url: getFulltextUrl()
        }
    }

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
        resultObj.color = "blue"
        devLog("PDF check done. success! PDF link:", pdfUrl)

    }, function(err){
        devLog("PDF check done. failure. useless link: ", pdfUrl)
        resultObj.isComplete = true
    });
}



function checkGsApi(myUrl){
    var gsUrl = "https://scholar.google.com/scholar?oi=gsb95&q=" + myUrl +  "&output=gsb&hl=en"
    devLog("Calling GS:", gsUrl)

    return new Promise(function(resolve, reject){
        //reject("rate-limit")

        $.getJSON(gsUrl, {}).done(function(resp){
        devLog("got data back from GS:", resp)
        if (!resp.r || !resp.r.length) {
            devLog("rate-limited GS.")
            reject("rate-limit")
            return false
        }

        var fulltextLink = resp.r[0].l.g
        if (!fulltextLink){
            reject()
            return false
        }

        if (fulltextLink.l.indexOf("[PDF]") > -1) {

            var plainUrlRegex = /url=(.+?)&hl=/
            var m = plainUrlRegex.exec(fulltextLink.u)

            resolve(decodeURI(m[1]))
        }

        }).fail(function(){
            reject()
        })
    })
}



function runGoogleScholar(resultObj){
    if (settings.bestPracticeReposOnly){
        resultObj.isComplete = true
        return
    }
    if (gsFailDois.includes(doi)){
        resultObj.isComplete = true
        console.log("GS manual override")
        return
    }

    var cacheUrlBase = "https://api.oadoi.org/gs/cache"
    var addToCache = function(landingPageUrl, fulltextUrl){
        var data = {
            doi: doi,
            landing_page_url: landingPageUrl,
            fulltext_url:fulltextUrl
        }
        devLog("posting this to cache", data)
        $.ajax({
          url:cacheUrlBase,
          type:"POST",
          data: JSON.stringify(data),
          contentType:"application/json; charset=utf-8",
          dataType:"json",
          success: function(){
              devLog("posted to the cache", data)
          }
        })
    }

    var cacheGetUrl = cacheUrlBase + "/" + doi
    if (ignoreCache){
        cacheGetUrl += "thiswillmakethecachecall404"
    }

    // first we try to get a cached GS result.
    $.getJSON(cacheGetUrl, {}).done(function(resp){
        devLog("found a cached GS result!", resp.fulltext_url)
        if (ignoreCache){ // useful for development.
            return false
        }
        if (resp.fulltext_url){
            extendResultObj(resultObj, resp.fulltext_url, "green")
        }
        else {
            extendResultObj(resultObj)
        }

    }).fail(function(){
        // the cache call returned a 404, so this DOI isn't cached yet.
        // so, now let's the GS API.

        checkGsApi(window.location.href).then(function(gsFulltextUrl){
            // success from GS

            extendResultObj(resultObj, gsFulltextUrl, "green")
            addToCache(window.location.href, gsFulltextUrl)

        }, function(err){
            // no luck on GS

            extendResultObj(resultObj, null, null)
            if (err != "rate-limit"){
                addToCache(window.location.href, null)
            }
        })

    })
}

function runOadoi(resultObj){
    var url = "https://api.oadoi.org/" + doi + "?email=unpaywall@impactstory.org"
    devLog("doing oaDOI check", url)


    $.getJSON(url, function(data){
        resultObj.isComplete = true
        devLog("oaDOI returned", data)
        var resp = data.results[0]
        resultObj.reported_noncompliant_copies = resp.reported_noncompliant_copies
        if (resp.oa_color){
            resultObj.color = resp.oa_color  // green or gold
            resultObj.url = resp.free_fulltext_url
        }
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

function getGoldUrl(){
    var oaDoiSource = getSource("oadoi")
    if (oaDoiSource.results.color == "gold") {
        return oaDoiSource.results.url
    }
}

function getBlueUrl(){
    var source = getSource("pdfLink")

    // first check to see if we've got the PDF from this page
    if (source.results.color == "blue") {
        return source.results.url
    }

    // then check oaDOI results
    var oadoiSource = getSource("oadoi")
    if (oadoiSource.results.color == "blue"){
        return oadoiSource.results.url
    }
}

function getGreenUrl(){

    var greenUrl
    var oadoiSource = getSource("oadoi")
    var googleScholarSource = getSource("googleScholar")

    // we prefer oaDOI results, check that first.
    if (oadoiSource.results.color == "green") {
        greenUrl = oadoiSource.results.url
    }

    // no oaDOI result, let's check GS
    else if (googleScholarSource.results.color == "green") {
        greenUrl = googleScholarSource.results.url
    }


    if (!greenUrl){
        return null
    }

    // oaDOI will also let us know if there is a URL we shouldn't use
    // because of reported copyright issues. now that we've got the
    // best URL, let's make sure it's ok to return.
    oadoiSource.results.reported_noncompliant_copies.forEach(function(badUrl){

        // check for "contains" rather than "equal" because the URL isn't always exact.
        if (greenUrl.toLowerCase().indexOf(badUrl.toLowerCase()) > -1){
            greenUrl = null
        }
    })

    return greenUrl
}




function decideTabColor(){
    //devLog("checking results....", allSources)

    var color
    if (getGoldUrl()){
        color = "gold"
    }
    else if (getBlueUrl()){
        color = "blue"
    }
    else if (getGreenUrl()){
        color = "green"
    }
    else {
        color = "black"
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

function getFulltextUrl(){
    var newLoc

    // this is in a different order than decideTabColor(). that's on
    // purpose. the blue link on a gold oa article is always the best one.
    if (getBlueUrl()){
        newLoc = getBlueUrl()
    }
    else if (getGoldUrl()){
        newLoc = getGoldUrl()
    }
    else if (getGreenUrl()){
        newLoc = getGreenUrl()
    }

    return newLoc
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

    // some sage DOIs have an underscore where there should be a slash.
    // eg: http://journals.sagepub.com/doi/10.1207/s15327957pspr0203_4
    doi = doi.replace("10.1207_", "10.1207/")

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
        findDoiFromPsycnet
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
    // check the page markup to see if this PDF looks free to download.
    // add more checks later...for now just IEEE
    // gold: http://ieeexplore.ieee.org/document/7169508/
    // not gold: http://ieeexplore.ieee.org/document/6512846/
    return !!runRegexOnDoc(/"(isOpenAccess":true,)/, "ieeexplore.ieee.org")

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

//function loadSettings(){
//    browser.storage.local.get({
//        showOaColor: false
//    }, function(items) {
//        devLog("retrieved settings", items)
//        settings.showOaColor = items.showOaColor;
//        settings.bestPracticeReposOnly = items.bestPracticeReposOnly
//    });
//}













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

function runWithSettings(){
    browser.storage.local.get(null, function(items){
        settings = items
        devLog("got settings", settings)
        run()
    });
}


// on firefox, jquery sometimes loads after this script. give it
// some time to load before we run anything on this page.
setTimeout(runWithSettings, 200)


















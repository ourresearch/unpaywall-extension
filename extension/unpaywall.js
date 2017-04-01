var devMode = true;
if (chrome){
    browser = chrome
}

var devLog = function(str, obj){
    if (devMode){
        console.log("unpaywall: " + str, obj)
    }
}
devLog("unpaywall is running")

// global variables:
var iframeIsInserted = false
var settings = {}
var myHost = window.location.hostname
var allSources = []












/***********************************************************************************
 *
 * Sources
 *
 ************************************************************************************/


function makeSourceObj(descr) {
    var results = {
        url: undefined,
        isComplete: false,
        color: undefined
    }

    return {
        results: results,
        name: descr[0],
        run: function(){
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

function sourcesAreAllComplete(){
    var numSources = allSources.length
    if (!numSources){
        return false
    }

    var numCompleteSources = 0
    allSources.forEach(function(source){
        if (source.results.isComplete){
            numCompleteSources += 1
        }
    })
    return numCompleteSources === numSources
}

// used by sources that need to check to make sure a link to a PDF
// really gets you a legit pdf.

function checkForPdf(pdfUrl){

    var promise = new Promise(function(resolve, reject){

        // ResearchGate PDFs always work. don't check.
        var rgRegex = /researchgate\.net(.+?)\.pdf$/
        if (rgRegex.test(pdfUrl)){
            resolve()
        }
        else {
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
        }
    })
    return promise
}




function runPdfLink(resultObj){
    var pdfUrl = findPdfUrl()
    if (!pdfUrl){
        resultObj.isComplete = true
        return false
    }

    devLog("doing PDF scrape on this URL", pdfUrl)
    checkForPdf(pdfUrl).then(function(){
        resultObj.isComplete = true
        resultObj.url = pdfUrl
        resultObj.color = "blue"
        devLog("found a PDF after checking", pdfUrl)

    }, function(err){
        resultObj.isComplete = true
    });
}


function runGoogleScholar(resultObj){
    if (settings.bestPracticeReposOnly){
        resultObj.isComplete = true
        return
    }

    var myUrl = window.location
    var gsUrl = "https://scholar.google.com/scholar?oi=gsb95&q=" + myUrl +  "&output=gsb&hl=en"
    devLog("Calling GS:", gsUrl)

    $.getJSON(gsUrl, {}).done(function(resp){
        devLog("got data back from GS:", resp)
        if (!resp.r || !resp.r.length) {
            devLog("ratelimited GS.")
            resultObj.isComplete = true
            return false
        }

        var fulltextLink = resp.r[0].l.g

        if (!fulltextLink){
            resultObj.isComplete = true
            return false
        }

        if (fulltextLink.l.indexOf("[PDF]") > -1) {

            var plainUrlRegex = /url=(.+?)&hl=/
            var m = plainUrlRegex.exec(fulltextLink.u)

            resultObj.url = decodeURI(m[1])
            resultObj.color = "green"
        }

        resultObj.isComplete = true

    }).fail(function(){
        resultObj.isComplete = true
    })

}


function runOadoi(resultObj){
    var doi = findDoi()
    var url = "https://api.oadoi.org/" + doi + "?email=unpaywall@impactstory.org"
    devLog("doing oaDOI check", url)


    $.getJSON(url, function(data){
        resultObj.isComplete = true
        devLog("oaDOI returned", data)
        var resp = data.results[0]
        if (resp.oa_color){
            resultObj.color = resp.oa_color  // green or gold
            resultObj.url = resp.free_fulltext_url
        }
    })

}


function resolvesToCurrentHost(url){
    var currentUrl = new URL(window.location)
    var oadoiUrl = new URL(url)
    return currentUrl.hostname === oadoiUrl.hostname
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
    if (source.results.color == "blue") {
        return source.results.url
    }
}

function getGreenUrl(){
    // we prefer oaDOI results, so use that instead of GS if we have 'em.
    var oadoiSource = getSource("oadoi")
    if (oadoiSource.results.color == "green") {
        return oadoiSource.results.url
    }

    var googleScholarSource = getSource("googleScholar")
    if (googleScholarSource.results.color == "green") {
        return googleScholarSource.results.url
    }
}




function decideTabColor(){
    //devLog("checking results....", allSources)

    if (!sourcesAreAllComplete()) {
        return
    }

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


// sniff DOIs from the altmetric.com widget and CrossMark widget.
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

// ScienceDirect has their own wacky format where the DOI is only
// defined in a JS variable. There are lots of ScienceDirect articles,
// so handle these specially.
// eg: http://www.sciencedirect.com/science/article/pii/S1751157709000881
function findDoiFromScienceDirect() {
    var docAsStr = document.documentElement.innerHTML;

    var scienceDirectRegex = /SDM.doi\s*=\s*'([^']+)'/;
    var m = scienceDirectRegex.exec(docAsStr)
    if (m && m.length > 1){
        devLog("found a DOI from ScienceDirect JS variable", m[1])
        return m[1]
    }
}


function findDoi(){
    // we try each of these functions, in order, to get a DOI from the page.
    var doiFinderFunctions = [
        findDoiFromMetaTags,
        findDoiFromScienceDirect,
        findDoiFromDataDoiAttributes
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


    // look in the markup itself. most of these will be pretty narrowly scoped
    // to a particular publisher.

    var $links = $("a")
    $links.each(function(i, link){
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
        if (myHost == "http://press.endocrine.org/") {
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
    })

    return pdfUrl
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
    var doi = findDoi()

    // the meat of the extension does not run unless we find a DOI
    if (!doi){
        return
    }

    devLog("we have a doi!", doi)
    makeAllSources()

    // these run in parallel:
    allSources.forEach(function(source){
        source.run()
    })

    // poll, waiting for all our data to be collected. once it is,
    // make a call and inject the iframe, then quit.
    var resultsChecker = setInterval(function(){
        var tabColor = decideTabColor()
        if (tabColor){
            insertIframe(tabColor, getFulltextUrl())
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


















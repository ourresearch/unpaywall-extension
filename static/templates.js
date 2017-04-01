angular.module('templates.app', ['faq.tpl.html', 'footer.tpl.html', 'header.tpl.html', 'landing.tpl.html', 'page-not-found.tpl.html', 'welcome.tpl.html']);

angular.module("faq.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("faq.tpl.html",
    "<div class=\"ti-page-header\" ng-include=\"'header.tpl.html'\"></div>\n" +
    "\n" +
    "<div class=\"page faq\">\n" +
    "    <div class=\"faq screen\" id=\"faq\">\n" +
    "        <div class=\"content\">\n" +
    "            <h1>Frequently asked questions</h1>\n" +
    "            <dl>\n" +
    "\n" +
    "                <!--\n" +
    "                <dt><i class=\"fa fa-chevron-right\"></i>How do I use Unpaywall?</dt>\n" +
    "                <dd>\n" +
    "                    After you\n" +
    "                    <a href=\"https://chrome.google.com/webstore/detail/unpaywall/iplffkdpngmdjhlpjmppncnlhomiipha\">install the extension</a>\n" +
    "\n" +
    "                    we'll do the work in the background. When you view a paywalled article,\n" +
    "                    we'll search for a free legal copy. When we find one (about 25% of the time\n" +
    "                    right now), you'll see an \"unlock\" tab on the right of your browser.\n" +
    "                    Click the tab, read the article. Easy.\n" +
    "                </dd>\n" +
    "                -->\n" +
    "\n" +
    "                <!--\n" +
    "                <dt><i class=\"fa fa-chevron-right\"></i>What do the different tab colors mean?</dt>\n" +
    "                <dd>\n" +
    "                    When you view a research article (which Unpaywall defines as one with a\n" +
    "                    <a href=\"http://www.apastyle.org/learn/faqs/what-is-doi.aspx\">DOI</a>),\n" +
    "                    you'll see a colored tab on the right of your browser window:\n" +
    "                    <ul>\n" +
    "                        <li>\n" +
    "                            <div class=\"button gold\">\n" +
    "                                <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                            </div>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color gold\">Gold</span> articles are available from the publisher\n" +
    "                                under an open license.\n" +
    "                                <a href=\"http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0000308\">(example)</a>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"button blue\">\n" +
    "                                <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                            </div>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color blue\">Blue</span> articles are available on the current page, either because they're\n" +
    "                                open-access without a license, or you're browsing from behind the paywall.\n" +
    "                                <a href=\"http://www.pnas.org/content/105/31/11014\">(example)</a>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"button green\">\n" +
    "                                <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                            </div>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color green\">Green</span> articles are available via an open, legal preprint server or\n" +
    "                                institutional repository.\n" +
    "                                <a href=\"http://rspa.royalsocietypublishing.org/content/454/1969/277\">(example)</a>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"button black\">\n" +
    "                                <i class=\"fa fa-lock\"></i>\n" +
    "                            </div>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color green\">Gray</span> articles don't have any legal open-access version\n" +
    "                                we could find.\n" +
    "                                <a href=\"https://link.springer.com/article/10.1007/BF02300480\">(example)</a>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "\n" +
    "\n" +
    "                    </ul>\n" +
    "\n" +
    "                </dd>\n" +
    "                -->\n" +
    "\n" +
    "\n" +
    "                <dt id=\"release-date\"><i class=\"fa fa-chevron-right\"></i>When is the official release?</dt>\n" +
    "                <dd>\n" +
    "                    April 4th. The extension mostly works right now, but we're still tweaking things.\n" +
    "                </dd>\n" +
    "\n" +
    "                <dt id=\"who-is-behind-this\"><i class=\"fa fa-chevron-right\"></i>Who's behind Unpaywall?</dt>\n" +
    "                <dd>\n" +
    "                    We're <a href=\"http://impactstory.org/about\">Impactstory,</a>\n" +
    "                    a nonprofit working to make science more open and reusable online.\n" +
    "                    We're supported by grants from <span class=\"funders\">\n" +
    "                    the National Science Foundation and the Alfred P. Sloan Foundation\n" +
    "            </span>\n" +
    "                </dd>\n" +
    "\n" +
    "                <dt id=\"why-did-you-make-it\"><i class=\"fa fa-chevron-right\"></i>Why did you make it?</dt>\n" +
    "                <dd>\n" +
    "                    We loathe paywalls. Now more than ever, humanity needs to <i>access</i> our collective knowledge,\n" +
    "                    not hoard it. Lots of scholars feel the same; that's why they\n" +
    "                    upload their papers to free, legal servers online. We realized that the missing link is in getting\n" +
    "                    these free resources to the people who want them, at the right time. By using a browser extension,\n" +
    "                    we can do that, leveraging the toll-access distribution system to bring\n" +
    "                    <a href=\"https://en.wikipedia.org/wiki/Open_access\">open access</a>\n" +
    "                    to the masses.\n" +
    "\n" +
    "                </dd>\n" +
    "\n" +
    "\n" +
    "                <dt id=\"how-often-finds-fulltext\"><i class=\"fa fa-chevron-right\"></i>How often does Unpaywall find full text?</dt>\n" +
    "                <dd>\n" +
    "                    In absolute terms? We've shown users ten thousand free articles this week alone, and that number\n" +
    "                    is growing fast (we're adding 500 new users a day). In relative terms?  Unpaywall users\n" +
    "                    get articles free about half the time, based on our usage data so far. This is improving regularly, as\n" +
    "                    we improve our discovery techniques. But the real improvement will come over the longer term, as\n" +
    "                    mandadory open access requirements begin to take effect in the\n" +
    "                    <a href=\"http://scholcomm.columbia.edu/open-access/public-access-mandates-for-federally-funded-research/\">US,</a>\n" +
    "                    <a href=\"http://www.rcuk.ac.uk/research/openaccess/\">UK,</a>\n" +
    "                    <a href=\"http://www.sciencemag.org/news/2016/05/dramatic-statement-european-leaders-call-immediate-open-access-all-scientific-papers/\">Europe,</a>\n" +
    "                    and elsewhere. Soon Unpaywall users will essentially have a free subscription to all new research.\n" +
    "                    We think that's a game-changer for open access, and for scholarship as a whole.\n" +
    "\n" +
    "                </dd>\n" +
    "\n" +
    "                <dt id=\"different-from-sci-hub\"><i class=\"fa fa-chevron-right\"></i>How's this different from Sci-Hub?</dt>\n" +
    "                <dd>\n" +
    "                    Like Unpaywall, Sci-Hub finds fulltext PDFs for paywalled articles. The main difference\n" +
    "                    is where those PDFs come from: Unpaywall finds PDFs legally uploaded\n" +
    "                    by the authors themselves, while\n" +
    "                    Sci-Hub uses PDFs that are obtained by other means, including automated web scraping\n" +
    "                    of publisher sites. Sci-Hub's method delivers more comprehensive results,\n" +
    "                    but is not super legal. So while\n" +
    "                    <a href=\"http://blog.impactstory.org/comparing-sci-hub-oadoi/\">we're not against Sci-Hub,</a>\n" +
    "                    we think Unpaywall offers a more sustainable approach by working within copyright law\n" +
    "                    and supporting the growing open access movement.\n" +
    "                </dd>\n" +
    "\n" +
    "                <dt id=\"different-from-oa-button\"><i class=\"fa fa-chevron-right\"></i>How's this different from the Open Access Button?</dt>\n" +
    "                <dd>\n" +
    "                    The <a href=\"https://openaccessbutton.org/\">OA Button</a> and Unpaywall are similar. But the\n" +
    "                    OA Button is a more mature project\n" +
    "                    (it's been working since 2013), and has a different user interface as well as\n" +
    "                    extra features including author emailing and\n" +
    "                    finding open datasets.\n" +
    "                    Unpaywall is more focused on seamlessly finding free content. The great thing is, both are open-source\n" +
    "                    and free, so you can install both, or\n" +
    "                    <a href=\"https://guides.github.com/activities/forking/\">fork 'em</a>\n" +
    "                    and make your own better extension!\n" +
    "                </dd>\n" +
    "\n" +
    "                <dt id=\"how-do-you-find-articles\"><i class=\"fa fa-chevron-right\"></i>How do you find all these fulltext articles?</dt>\n" +
    "                <dd>\n" +
    "                    We gather content from thousands of open-access repositories worldwide.\n" +
    "                    To help us, we rely on some fantastic open data services, especially\n" +
    "                    <a href=\"https://www.ncbi.nlm.nih.gov/pmc/\">PubMed Central</a>,\n" +
    "                    <a href=\"https://doaj.org/\">the DOAJ,</a>\n" +
    "                    <a href=\"https://www.crossref.org/\">Crossref</a> (particulary their license info),\n" +
    "                    <a href=\"https://www.datacite.org/\">DataCite,</a>\n" +
    "                    and <a href=\"https://www.base-search.net/\">BASE.</a>\n" +
    "\n" +
    "                    After we put all this data together, we in turn make it open for reuse via the\n" +
    "                    <a href=\"http://oadoi.org/about\">oaDOI</a> API: a free, fast, and very scalable\n" +
    "                    way to leverage our data and infrastructure to support your own projects.\n" +
    "                </dd>\n" +
    "\n" +
    "                <dt id=\"privacy-policy\"><i class=\"fa fa-chevron-right\"></i>What's your privacy policy?</dt>\n" +
    "                <dd>\n" +
    "                    The extension doesn't store or ask for any personal information from you, so when you use Unpaywall\n" +
    "                    we don't know who you are. The extension doesn't track your browsing history, and it\n" +
    "                    doesn't send any content from any page you visit to our servers, with one exception:\n" +
    "                    when a page has a DOI (a short identifier used by scholarly articles), we send that DOI\n" +
    "                    to our server (using an encrypted HTTPS connection) to find any free versions.\n" +
    "                    We will log requests to our servers\n" +
    "                    (which include the DOI and the IP address the request came from) in order to\n" +
    "                    monitor and improve service. But those logs aren't\n" +
    "                    connected to your identity. Furthermore, the extension won't send or use\n" +
    "                    any kind of browser fingerprinting technology to identify your computer.\n" +
    "                </dd>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <dt id=\"identify-green-or-gold\"><i class=\"fa fa-chevron-right\"></i>Can Unpaywall tell me whether an article is \"Green\" or \"Gold\" OA?</dt>\n" +
    "                <dd>Indeed we can. Click the green Unpaywall extension icon in\n" +
    "                    your browser toolbar and choose \"Settings.\" Once there, tick \"Color-code tab for Green and Gold OA.\"\n" +
    "                    Thenceforth, you'll enjoy a veritable rainbow of OA colorfully goodness as you browse different articles:\n" +
    "                    <ul>\n" +
    "                        <li>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color gold\">Gold tab</span> for <a\n" +
    "                                    href=\"https://en.wikipedia.org/wiki/Open_access#Journals:_gold_open_access\">Gold OA,</a> a\n" +
    "                                rticles available from the publisher\n" +
    "                                under an open license.\n" +
    "                                <a class=\"eg\" href=\"http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0000308\">(example)</a>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color green\">Green tab</span> for <a\n" +
    "                                    href=\"https://en.wikipedia.org/wiki/Self-archiving\">Green OA</a> articles on a preprint server or\n" +
    "                                institutional repository.\n" +
    "                                <a class=\"eg\" href=\"http://rspa.royalsocietypublishing.org/content/454/1969/277\">(example)</a>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color blue\">Blue tab</span> for articles available on the current page, but lacking\n" +
    "                                license information (often that's because you're browsing from behind the paywall).\n" +
    "                                <a class=\"eg\" href=\"http://www.pnas.org/content/105/31/11014\">(example)</a>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </dd>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <dt id=\"report-bugs\"><i class=\"fa fa-chevron-right\"></i>I found a bug</dt>\n" +
    "                <dd>\n" +
    "                    Sorry about that! Unfortunately this is pretty common, especially where publishers\n" +
    "                    don't follow standard practices for article display (as they often do not).\n" +
    "                    For instance, we don't work for articles missing\n" +
    "                    <a href=\"http://www.apastyle.org/learn/faqs/what-is-doi.aspx\">DOIs.</a>\n" +
    "\n" +
    "                    The good news is that it's still early days for this project and\n" +
    "                    it's under very active development. When you find an error,\n" +
    "                    <a href=\"mailto:team@impactstory.org\">drop us an email</a> and we'll get it fixed for you.\n" +
    "                </dd>\n" +
    "\n" +
    "            </dl>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"footer-container\" ng-include=\"'footer.tpl.html'\"></div>");
}]);

angular.module("footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer.tpl.html",
    "<div class=\"footer\">\n" +
    "    <div class=\"content\" layout=\"row\" layout-xs=\"column\">\n" +
    "\n" +
    "        <div class=\"links\" flex=\"40\" flex-xs=\"100\">\n" +
    "            <a href=\"mailto:team@impactstory.org\">\n" +
    "                <i class=\"fa fa-envelope-o\"></i>\n" +
    "                Email\n" +
    "            </a>\n" +
    "            <a href=\"http://twitter.com/unpaywall\">\n" +
    "                <i class=\"fa fa-twitter\"></i>\n" +
    "                Twitter\n" +
    "            </a>\n" +
    "            <a href=\"https://github.com/Impactstory/unpaywall\">\n" +
    "                <i class=\"fa fa-github\"></i>\n" +
    "                GitHub\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <div class=\"logo\" flex=\"20\" hide-xs>\n" +
    "            <!--\n" +
    "            <a href=\"/\" ng-click=\"scrollToTop()\">\n" +
    "                <img src=\"static/img/icon-white.png\" alt=\"\">\n" +
    "            </a>\n" +
    "            -->\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <div class=\"credit\" flex=\"40\" flex-xs=\"100\">\n" +
    "            <span class=\"built-by\">\n" +
    "                Built with <i class=\"fa fa-heart\"></i> at\n" +
    "                <a href=\"faq#who-is-behind-this\">Impactstory</a>, with support from\n" +
    "            </span>\n" +
    "            <span class=\"funders\">\n" +
    "                 the National Science Foundation and the Alfred P. Sloan Foundation\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar\">\n" +
    "    <a href=\"/\">\n" +
    "        <img id=\"logo\" src=\"static/img/logo.png\" alt=\"\">\n" +
    "    </a>\n" +
    "    <div class=\"spacer\"></div>\n" +
    "\n" +
    "    <!--\n" +
    "    <a class=\"questions\" href=\"\" ng-click=\"scrollToAbout()\">\n" +
    "    </a>\n" +
    "    -->\n" +
    "\n" +
    "    <div class=\"links\">\n" +
    "        <a href=\"/faq\">\n" +
    "            <i class=\"fa fa-question-circle\"></i>\n" +
    "            FAQ\n" +
    "        </a>\n" +
    "        <a href=\"/\" class=\"home\">\n" +
    "            <i class=\"fa fa-home\"></i>\n" +
    "            home\n" +
    "        </a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("landing.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("landing.tpl.html",
    "<div class=\"page landing\">\n" +
    "    <div class=\"ti-page-header landing-page\" ng-include=\"'header.tpl.html'\"></div>\n" +
    "    <div class=\"top-screen screen\">\n" +
    "\n" +
    "\n" +
    "        <div class=\"main-copy\">\n" +
    "            <div class=\"tagline\">\n" +
    "                <div class=\"above\">\n" +
    "                    Click the\n" +
    "                    <span class=\"tab-word\">tab.</span>\n" +
    "                </div>\n" +
    "                <div class=\"under\">\n" +
    "                    Skip the paywall.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"about\">\n" +
    "                Get full-text\n" +
    "                of research papers as you browse, using Unpaywall's index of ten million\n" +
    "                legal, open-access articles.\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"cta\">\n" +
    "\n" +
    "                <div class=\"button-info\" ng-show=\"browser=='unsupported'\">\n" +
    "                    Requires Firefox or Chrome for desktop.\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"button-info\" ng-show=\"browser != 'unsupported'\">\n" +
    "                    Free for Chrome and Firefox\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"install\" ng-click=\"ctaClick()\">\n" +
    "                    <span class=\"chrome\" ng-show=\"browser=='chrome'\">\n" +
    "                        <i class=\"fa fa-plus\"></i>\n" +
    "                        Add Unpaywall to Chrome\n" +
    "                    </span>\n" +
    "                    <span class=\"firefox\" ng-show=\"browser=='firefox'\">\n" +
    "                        <i class=\"fa fa-plus\"></i>\n" +
    "                        Add Unpaywall to Firefox\n" +
    "                        <span class=\"small\">on the Firefox web store</span>\n" +
    "                    </span>\n" +
    "                    <span class=\"fallback\" ng-show=\"browser=='unsupported'\">\n" +
    "                        <i class=\"fa fa-twitter\"></i>\n" +
    "                        Tweet it now\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"main-img\">\n" +
    "            <img src=\"static/img/screenshot.png\" alt=\"\">\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <!-- use this special landing-page-only footer -->\n" +
    "        <div class=\"more\">\n" +
    "            <div class=\"links\">\n" +
    "                <a href=\"mailto:team@impactstory.org\">\n" +
    "                    <i class=\"fa fa-envelope-o\"></i>\n" +
    "                    Email\n" +
    "                </a>\n" +
    "                <a href=\"http://twitter.com/unpaywall\">\n" +
    "                    <i class=\"fa fa-twitter\"></i>\n" +
    "                    Twitter\n" +
    "                </a>\n" +
    "                <a href=\"https://github.com/Impactstory/unpaywall\">\n" +
    "                    <i class=\"fa fa-github\"></i>\n" +
    "                    GitHub\n" +
    "                </a>\n" +
    "                <a href=\"/faq\">\n" +
    "                    <i class=\"fa fa-question-circle\"></i>\n" +
    "                    FAQ\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div class=\"spacer\"></div>\n" +
    "            <div class=\"by\">\n" +
    "                Made with <i class=\"fa fa-heart\"></i> by\n" +
    "                <a href=\"/faq#who-is-behind-this\">Impactstory.</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"firefox-coming-soon.tpl.html\">\n" +
    "    <md-dialog>\n" +
    "        <md-dialog-content>\n" +
    "            <div class=\"md-dialog-content\">\n" +
    "                <h2>Coming soon</h2>\n" +
    "                <p>\n" +
    "                    The Firefox extension is currently moving through <a\n" +
    "                        href=\"https://developer.mozilla.org/en-US/Add-ons/AMO/Policy/Reviews\">Mozilla's review process,</a><br>\n" +
    "                    but we can notify you when it's ready to be installed.\n" +
    "\n" +
    "                </p>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "        </md-dialog-content>\n" +
    "\n" +
    "        <md-dialog-actions>\n" +
    "            <a class=\"dialog-button\" href=\"\" ng-click=\"cancel()\">I'm good.</a>\n" +
    "\n" +
    "            <a class=\"primary dialog-button\"\n" +
    "               target=\"_blank\"\n" +
    "               href=\"https://goo.gl/forms/LanJmpUSn6vw4Ylp2\">\n" +
    "                Yep, let me know!\n" +
    "            </a>\n" +
    "        </md-dialog-actions>\n" +
    "    </md-dialog>\n" +
    "\n" +
    "\n" +
    "</script>\n" +
    "");
}]);

angular.module("page-not-found.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page-not-found.tpl.html",
    "<div class=\"landing static-page\">\n" +
    "    <h1>Sorry, we couldn't find that page!</h1>\n" +
    "\n" +
    "</div>");
}]);

angular.module("welcome.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("welcome.tpl.html",
    "<div class=\"page welcome\">\n" +
    "    <div class=\"ti-page-header welcome\" ng-include=\"'header.tpl.html'\"></div>\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"top-row\">\n" +
    "            <h1>You've installed Unpaywall!</h1>\n" +
    "            <div class=\"spacer\"></div>\n" +
    "            <div class=\"share\">\n" +
    "                <span class=\"ti-label\">share:</span>\n" +
    "                <span class=\"share-icons\">\n" +
    "                    <a target=\"_blank\" class=\"share-icon\" href=\"mailto:?subject=Neat way to bypasses paywalls on research articles, legally.&amp;body=The Unpaywall browser extension finds free, legal versions of paywalled articles as you browse. http%3A%2F%2Funpaywall.org\">\n" +
    "                        <i class=\"fa fa-envelope-o\"></i>\n" +
    "                    </a>\n" +
    "                    <a target=\"_blank\" href=\"https://twitter.com/intent/tweet?url=http://unpaywall.org&text=The%20new%20%40unpaywall%20extension%20unlocks%20free%2C%20legal%20versions%20of%20paywalled%20research%20papers%20as%20you%20browse.%20%23openaccess\">\n" +
    "                        <i class=\"fa fa-twitter\"></i>\n" +
    "                    </a>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            \n" +
    "        </div>\n" +
    "\n" +
    "        <p>\n" +
    "            When you view a research article, check the tab on the right of your screen.\n" +
    "        </p>\n" +
    "        <ul>\n" +
    "            <li class=\"green\">\n" +
    "                <span class=\"tab green\"><i class=\"fa fa-unlock-alt\"></i></span>\n" +
    "                <span class=\"text green\">green tab:</span>\n" +
    "                we found free, legal full text. Click it to read!\n" +
    "            </li>\n" +
    "            <li class=\"gray\">\n" +
    "                <span class=\"tab gray\"><i class=\"fa fa-lock\"></i></span>\n" +
    "                <span class=\"text gray\">gray tab:</span>\n" +
    "                we came up empty.\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <h2>Let's try an example!</h2>\n" +
    "        <p>\n" +
    "             This article describes a newly-discovered solar system, and\n" +
    "            it'll cost you $32 to read on Nature.com...except now that you've got Unpaywall, it's free!\n" +
    "\n" +
    "        </p>\n" +
    "\n" +
    "\n" +
    "        <p class=\"eg\">\n" +
    "            <a class=\"eg\" target=\"_blank\" href=\"http://www.nature.com/nature/journal/v542/n7642/full/nature21360.html\">\n" +
    "                <i class=\"fa fa-file-text-o\"></i>\n" +
    "                See the example\n" +
    "            </a>\n" +
    "        </p>\n" +
    "\n" +
    "\n" +
    "        <p class=\"ps\">\n" +
    "            PS for the Open Access nerds: the Unpaywall tab\n" +
    "            can change colors to indicate Green or Gold OA, too. Enable it in settings.\n" +
    "        </p>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"footer-container\" ng-include=\"'footer.tpl.html'\"></div>\n" +
    "");
}]);

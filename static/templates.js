angular.module('templates.app', ['api-v2.tpl.html', 'data.tpl.html', 'faq.tpl.html', 'footer.tpl.html', 'header.tpl.html', 'landing.tpl.html', 'page-not-found.tpl.html', 'sources.tpl.html', 'welcome.tpl.html']);

angular.module("api-v2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("api-v2.tpl.html",
    "<div class=\"ti-page-header\" ng-include=\"'header.tpl.html'\"></div>\n" +
    "\n" +
    "<div class=\"page api-v2\">\n" +
    "    <div class=\"content\">\n" +
    "    <h1>API Version 2</h1>\n" +
    "    <div class=\"version-good\">\n" +
    "        Version 2 will become the default version on October 1, 2017, and we recommend that new users build on this version. Use it now by prepending <code>/v2</code> to each endpoint.\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"toc\">\n" +
    "        <li><a href=\"#limits\">Limits and authentication</a></li>\n" +
    "        <li>\n" +
    "            <a href=\"#endpoints\">Endpoints</a>\n" +
    "            <ul>\n" +
    "                <li><a href=\"#get-base\">GET /v2</a></li>\n" +
    "                <li><a href=\"#get-doi\">GET /v2/:doi</a></li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            <a href=\"#response-objects\">Response objects</a>\n" +
    "            <ul>\n" +
    "                <li><a href=\"#api-status-object\">API Status object</a></li>\n" +
    "                <li><a href=\"#oa-location-object\">OA Location object</a></li>\n" +
    "                <li><a href=\"#doi-object\">DOI object</a></li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"limits\">Limits and authentication</h2>\n" +
    "    <p>\n" +
    "        The REST API gives anyone free, programmatic access to all of oaDOI's data.\n" +
    "        There's no rate limit, but if you need more than 100k calls/day you\n" +
    "        may want to download the datasets instead.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Requests must include your email, so that we can\n" +
    "        get in touch if something breaks, and so we can report usage to our funders.\n" +
    "        Add the email as a parameter at the end of the URL, like this:\n" +
    "        <code>?email=YOUR_EMAIL</code>.\n" +
    "    </p>\n" +
    "\n" +
    "    <p>\n" +
    "        If you're using the API, we recommend you subscribe to the\n" +
    "        <a href=\"https://groups.google.com/forum/#!forum/oadoi-users\">mailing list</a> in order\n" +
    "        to stay up-to-date when there are changes or new features.\n" +
    "    </p>\n" +
    "\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"endpoints\">Endpoints</h2>\n" +
    "\n" +
    "\n" +
    "    <div class=\"endpoint\" id=\"get-base\">\n" +
    "        <code class=\"endpoint\">GET /</code>\n" +
    "\n" +
    "        <table class=\"endpoint\">\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Description\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    Gets an API status object that describes this API.\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Returns\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"#api-status-object\">API Status object</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Example\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"https://api.oadoi.org/v2?email=test@example.com\">https://api.oadoi.org/v2?email=test@example.com</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"endpoint\" id=\"get-doi\">\n" +
    "        <code class=\"endpoint\">GET /:doi</code>\n" +
    "        <table class=\"endpoint\">\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Description\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    Gets OA status and bibliographic info for an given DOI-assigned resource.\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Accepts\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    A valid DOI.\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Returns\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"#doi-object\">DOI object</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Example\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"https://api.oadoi.org/v2/10.1038/nature12373?email=test@example.com\">https://api.oadoi.org/v2/10.1038/nature12373?email=test@example.com</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <!-------------------------------------------------------------------------\n" +
    "\n" +
    "    RESPONSE OBJECTS\n" +
    "\n" +
    "    --------------------------------------------------------------------------->\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"response-objects\">Response objects</h2>\n" +
    "    <p>The API returns three different types of response objects. Really two, since more users won't ever need the API Status object, which just defines the root of the API. The OA Location object describes a place we found an OA copy of an article. There are one or more of these associated with DOI object, which describes a given DOI-assigned resource.</p>\n" +
    "\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"api-status-object\">API Status object</h3>\n" +
    "    <table class=\"api-responses\">\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">documentation_url</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Where you can find documentation for this version.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">msg</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Relevant messages.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">version</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Version string.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Example: <code>2.0.1</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"oa-location-object\">OA Location object</h3>\n" +
    "    <p>The OA Location object describes particular location where we found a given OA article. The same article is often available from multiple locations. There may be differences in format, version, and license from one location to another, even if it's the same article in all cases.</p>\n" +
    "    <table class=\"api-responses\">\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">evidence</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                How we found this OA location.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    Used for debugging. Don’t depend on the exact contents of this for anything, because values are subject to change without warning. Example values:\n" +
    "\n" +
    "                </p>\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>oa journal (via journal title in doaj)</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            We found the name of the journal that publishes this article in the DOAJ database.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>oa repository (via pmcid lookup)</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            We found this article in an index of PubMed Central articles.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">host_type</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The type of host that serves this OA location.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    There are two possible values:\n" +
    "                </p>\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>publisher</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            means the this location is served by the article’s publisher (in practice, this means it is hosted on the same domain the DOI resolves to).\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>repository</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            means this location is served by an Open Access repository.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">license</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The license under which this copy is published.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>We return several types of licenses:</p>\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        Creative Commons licenses are uniformly abbreviated and lowercased. Example: <code>cc-by-nc</code>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        Publisher-specific licenses are normalized using this format: <code>acs-specific: authorchoice/editors choice usage agreement</code>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        When we have evidence that an OA license of <em>some</em> kind was used, but it’s not reported directly on the webpage at this location, this field returns <code>implied-oa</code>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">updated</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Time when the data for this location was last updated.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Returned as an <a href=\"https://xkcd.com/1179/\">ISO8601-formatted</a> timestamp. Example: <code>2017-08-17T23:43:27.753663</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">url</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The URL where you can find this OA copy.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    Although this URL points to fulltext of <em>some</em> kind, there is (for now) no format normalization...it could be PDF, HTML, or even Word or TeX.\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">versions</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The content version accessible at this location.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    We use the <a href=\"https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings\">DRIVER Guidelines v2.0 VERSION standard</a> to define  versions of a given article; see those docs for complete definitions of terms. Here's the basic idea, though, for the three version types we support:\n" +
    "                </p>\n" +
    "                <ul>\n" +
    "                    <li><code>submittedVersion</code> is not yet peer-reviewed.</li>\n" +
    "                    <li><code>acceptedVersion</code> is peer-reviewed, but lacks publisher-specific formatting.</li>\n" +
    "                    <li><code>publishedVersion</code> is the version of record.</li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"doi-object\">DOI object</h3>\n" +
    "    <p>The DOI object describes a given DOI-assigned resource. It contains metadata about the resource itself, as well as information about its OA status.</p>\n" +
    "\n" +
    "    <table class=\"api-responses\">\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">best_oa_location</span>\n" +
    "                <span class=\"type\">Object|null</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The best <a href=\"#oa-location-object\">OA Location</a> object we could find for this DOI.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    The \"best\" location is determined using an algorithm that prioritizes publisher-hosted content first (eg Hybrid or Gold), then prioritizes versions closer to the version of record (<code>PublishedVersion</code> over <code>AcceptedVersion</code>), then more authoritative repositories (PubMed Central over CiteSeerX).\n" +
    "                </p>\n" +
    "                <p>\n" +
    "                    Returns <code>null</code> if we couldn't find any OA Locations.\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">data_standard</span>\n" +
    "                <span class=\"type\">Integer</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Indicates the data collection approaches used for this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>Possible values</p>\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>1</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            First-generation hybrid detection. Uses only data from the Crossref API to determine hybrid status. Does a good job for Elsevier articles and a few other publishers, but most publishers are not checked for hybrid.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>2</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            Second-generation hybrid detection. Uses additional sources, checks all publishers for hybrid. Gets about 10x as much hybrid. <code>data_standard==2</code> is the version used in the paper we wrote about oaDOI.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">doi</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The DOI of this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                This is always lowercase.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">is_oa</span>\n" +
    "                <span class=\"type\">Boolean</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                <code>True</code> if there is an OA copy of this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Convenience attribute; returns <code>true</code> when <code>best_oa_location</code> is not <code>null</code>.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">journal_is_oa</span>\n" +
    "                <span class=\"type\">Boolean</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Is this resource published in a completely OA journal\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Useful for most definitions of Gold OA. Currently this is based entirely on inclusion in the <a\n" +
    "                    href=\"http://doaj.org\">DOAJ,</a> but eventually may use additional ways of identifying all-OA journals.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">journal_issns</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Any ISSNs assigned to the journal publishing this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Separate ISSNs are sometimes assigned to print and electronic versions of the same journal. If there are multiple ISSNs, they are separated by commas. Example: <code>1232-1203,1532-6203</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">journal_name</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The name of the journal publishing this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                The same journal may have multiple name strings (eg, \"J. Foo\", \"Journal of Foo\", \"JOURNAL OF FOO\", etc). These have not been fully normalized within our database, so use with care.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">oa_locations</span>\n" +
    "                <span class=\"type\">List</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                List of all the <a href=\"#oa-location-object\">OA Location</a> objects associated with this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                This list is unnecessary for the vast majority of use-cases, since you probably just want the <code>best_oa_location</code>. It's included primarily for research purposes.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">publisher</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The name of this resource's publisher.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Keep in mind that publisher name strings change over time, particularly as publishers are acquired or split up.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">title</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The title of this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                It's the title. Pretty straightforward.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">updated</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Time when the data for this resource was last updated.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Returned as an <a href=\"https://xkcd.com/1179/\">ISO8601-formatted</a> timestamp. Example: <code>2017-08-17T23:43:27.753663</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"footer-container\" ng-include=\"'footer.tpl.html'\"></div>");
}]);

angular.module("data.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("data.tpl.html",
    "<div class=\"ti-page-header\" ng-include=\"'header.tpl.html'\"></div>\n" +
    "\n" +
    "<div class=\"page data\">\n" +
    "    <div class=\"content\">\n" +
    "        <h1>\n" +
    "            Accessing the Unpaywall database\n" +
    "        </h1>\n" +
    "\n" +
    "        <div>\n" +
    "            <p>\n" +
    "                We're finishing up this page. It will be available\n" +
    "                on Monday, Jan 22.\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                Here's the\n" +
    "                <a href=\"api/v2\">API Version 2 docs.</a>\n" +
    "\n" +
    "            </p>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"footer-container\" ng-include=\"'footer.tpl.html'\"></div>");
}]);

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
    "                <dt id=\"who-is-behind-this\"><i class=\"fa fa-chevron-right\"></i>Who's behind Unpaywall?</dt>\n" +
    "                <dd>\n" +
    "                    We're <a href=\"http://impactstory.org/about\">Impactstory,</a>\n" +
    "                    a nonprofit working to make science more open and reusable online.\n" +
    "                    We're supported by grants from <span class=\"funders\">\n" +
    "                    the National Science Foundation and the Alfred P. Sloan Foundation\n" +
    "            </span>\n" +
    "                </dd>\n" +
    "                -->\n" +
    "\n" +
    "\n" +
    "                <dt id=\"how-often-finds-fulltext\"><i class=\"fa fa-chevron-right\"></i>How often does Unpaywall find full text?</dt>\n" +
    "                <dd>\n" +
    "                    Overall, Unpaywall users find fulltext for 47% of articles. You may get different results,\n" +
    "                    depending on the age and topic of the articles you're reading. There's more information\n" +
    "                    on how we found these numbers in\n" +
    "                    <a href=\"https://peerj.com/preprints/3119v1/\">this paper.</a>\n" +
    "\n" +
    "                    This success rate will improve as we tweak our algorithm and as\n" +
    "                    mandatory open access requirements take effect in the\n" +
    "                    <a href=\"http://scholcomm.columbia.edu/open-access/public-access-mandates-for-federally-funded-research/\">US,</a>\n" +
    "                    <a href=\"http://www.rcuk.ac.uk/research/openaccess/\">UK,</a>\n" +
    "                    <a href=\"http://www.sciencemag.org/news/2016/05/dramatic-statement-european-leaders-call-immediate-open-access-all-scientific-papers/\">Europe,</a>\n" +
    "                    and elsewhere.\n" +
    "                </dd>\n" +
    "\n" +
    "                <dt id=\"how-do-you-find-articles\"><i class=\"fa fa-chevron-right\"></i>How do you find all these fulltext articles?</dt>\n" +
    "                <dd>\n" +
    "                    We harvest content directly from thousands of open-access repositories worldwide.\n" +
    "                    We also use great open data from\n" +
    "                    <a href=\"https://www.ncbi.nlm.nih.gov/pmc/\">PubMed Central</a>,\n" +
    "                    <a href=\"https://doaj.org/\">the DOAJ,</a>\n" +
    "                    <a href=\"https://www.crossref.org/\">Crossref</a> (particulary their license info), and\n" +
    "                    <a href=\"https://www.datacite.org/\">DataCite.</a>\n" +
    "                </dd>\n" +
    "\n" +
    "                <dt id=\"api\"><i class=\"fa fa-chevron-right\"></i>Does Unpaywall have an API?</dt>\n" +
    "                <dd>\n" +
    "                    Yes! We make all of Unpaywall's data available via the <a href=\"http://oadoi.org/about\">oaDOI API.</a>\n" +
    "                    The oaDOI service is currently used to enrich hundreds of academic libraries, search engines,\n" +
    "                    indexing services, and other tools; it's also used in many research and evaluation projects.\n" +
    "                </dd>\n" +
    "\n" +
    "\n" +
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
    "                                    href=\"https://en.wikipedia.org/wiki/Open_access#Journals:_gold_open_access\">Gold OA</a>\n" +
    "                                articles available from a fully OA journal.\n" +
    "                                <a class=\"eg\" href=\"http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0000308\">(example)</a>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color green\">Green tab</span> for <a\n" +
    "                                    href=\"https://en.wikipedia.org/wiki/Self-archiving\">Green OA</a> articles on a preprint server or\n" +
    "                                institutional repository.\n" +
    "                                <a class=\"eg\" href=\"https://www.nature.com/nature/journal/v542/n7642/full/nature21360.html\">(example)</a>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <div class=\"text\">\n" +
    "                                <span class=\"color bronze\">Bronze tab</span> for <a\n" +
    "                                    href=\"https://peerj.com/preprints/3119v1/\">Bronze OA</a> articles free to read on the current page, but\n" +
    "                                published in a toll-access journal.\n" +
    "                                <a class=\"eg\" href=\"http://www.pnas.org/content/105/31/11014\">(example)</a>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </dd>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <dt id=\"report-bugs\"><i class=\"fa fa-chevron-right\"></i>I found a bug</dt>\n" +
    "                <dd>\n" +
    "                    Sorry about that!\n" +
    "                    <a href=\"mailto:team@impactstory.org\">Drop us an email</a> and we'll get it fixed for you.\n" +
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
    "            </a>\n" +
    "            <a href=\"http://twitter.com/unpaywall\">\n" +
    "                <i class=\"fa fa-twitter\"></i>\n" +
    "            </a>\n" +
    "            <a href=\"https://github.com/Impactstory/unpaywall\">\n" +
    "                <i class=\"fa fa-github\"></i>\n" +
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
    "        <div class=\"credit\" flex=\"60\" flex-xs=\"100\">\n" +
    "            <span class=\"built-by\">\n" +
    "                Built with <i class=\"fa fa-heart-o\"></i> at\n" +
    "                <a href=\"faq#who-is-behind-this\">Impactstory</a>, with support from\n" +
    "            </span>\n" +
    "            <span class=\"funders\">\n" +
    "                 the National Science Foundation and the Alfred P. Sloan Foundation.\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar\">\n" +
    "    <a href=\"/\">\n" +
    "        <img id=\"site-logo\" src=\"static/img/logo-green.png\" alt=\"\">\n" +
    "    </a>\n" +
    "    <div class=\"spacer\"></div>\n" +
    "\n" +
    "    <!--\n" +
    "    <a class=\"questions\" href=\"\" ng-click=\"scrollToAbout()\">\n" +
    "    </a>\n" +
    "    -->\n" +
    "\n" +
    "    <div class=\"links\">\n" +
    "        <a href=\"/\" class=\"install\" hide show--gt-xs>\n" +
    "            <i class=\"fa fa-plus-circle\"></i>\n" +
    "            Install\n" +
    "        </a>\n" +
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
    "<div class=\"ti-page-header landing-page\" ng-include=\"'header.tpl.html'\"></div>\n" +
    "<div class=\"page landing\">\n" +
    "    <div class=\"top-screen screen\">\n" +
    "\n" +
    "\n" +
    "        <div class=\"top-screen-content\">\n" +
    "            <img class=\"screenshot\" src=\"static/img/browser-frame.png\" alt=\"\">\n" +
    "\n" +
    "            <div class=\"main-copy\">\n" +
    "                <div class=\"tagline\">\n" +
    "                    <div class=\"above\">\n" +
    "                        Read research papers for free.\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"about\">\n" +
    "                    <p>\n" +
    "                        Click the green tab and skip the paywall on millions of peer-reviewed journal articles.\n" +
    "                        It's fast, free, and legal.\n" +
    "                    </p>\n" +
    "                    <p class=\"button-info\" ng-show=\"browser=='unsupported'\">\n" +
    "                        Unpaywall requires the desktop edition of Firefox or Chrome.\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"cta\">\n" +
    "                    <div class=\"install\" ng-click=\"ctaClick()\">\n" +
    "                        <span class=\"chrome\" ng-show=\"browser=='chrome'\">\n" +
    "                            Add to Chrome - It's free\n" +
    "                        </span>\n" +
    "                        <span class=\"firefox\" ng-show=\"browser=='firefox'\">\n" +
    "                            Add to Firefox - It's free\n" +
    "                            <span class=\"small\">via the Firefox web store</span>\n" +
    "                        </span>\n" +
    "                        <span class=\"fallback\" ng-show=\"browser=='unsupported'\">\n" +
    "                            <i class=\"fa fa-envelope-o\"></i>\n" +
    "                            Send myself a reminder to install later\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"about-users\">\n" +
    "                    <div class=\"rating\">\n" +
    "                        <span class=\"stars\">\n" +
    "                            <i class=\"fa fa-star\"></i>\n" +
    "                            <i class=\"fa fa-star\"></i>\n" +
    "                            <i class=\"fa fa-star\"></i>\n" +
    "                            <i class=\"fa fa-star\"></i>\n" +
    "                            <i class=\"fa fa-star\"></i>\n" +
    "                        </span>\n" +
    "                        <span class=\"light\">five-star rating on Chrome Web Store</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"num-users\">\n" +
    "                        <span class=\"num\">\n" +
    "                            116,492\n" +
    "                        </span>\n" +
    "                        <span class=\"light\">users on Chrome and Firefox have read millions of articles for free.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"more\">\n" +
    "            <div class=\"content\">\n" +
    "                <i class=\"fa fa-chevron-down\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div> <!-- end top screen -->\n" +
    "\n" +
    "\n" +
    "    <div class=\"social-proof\">\n" +
    "        <div class=\"quote\">\n" +
    "            <div class=\"content\">\n" +
    "                \"Must-have for anyone who wants access to the research literature.\"\n" +
    "            </div>\n" +
    "            <div class=\"attribution\">\n" +
    "                 &mdash;Andrew Treloar, <em>Australian National Data Service</em>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"logos\">\n" +
    "            <img src=\"static/img/nature.png\" alt=\"\">\n" +
    "            <img src=\"static/img/science.png\" alt=\"\">\n" +
    "            <img src=\"static/img/techcrunch.png\" alt=\"\">\n" +
    "            <img src=\"static/img/gizmodo.png\" class=\"gizmodo\" alt=\"\">\n" +
    "            <img src=\"static/img/chronicle.png\" class=\"chronicle\" alt=\"\">\n" +
    "        </div>\n" +
    "        \n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"benefit legal\">\n" +
    "        <img src=\"static/img/seal-check.png\" class=\"illustration\" alt=\"\">\n" +
    "        <div class=\"copy\">\n" +
    "            <h2>Legal, fair, and sustainable</h2>\n" +
    "            <p>\n" +
    "                Millions of research papers are available for free on government and university web servers, legally  uploaded by the authors themselves, with the express permission of publishers. Unpaywall automatically harvests these freely shared papers from thousands of legal institutional repositories, preprint servers, and publishers, making them all availabe to you as you read.\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"benefit effective\">\n" +
    "        <div class=\"copy\">\n" +
    "            <h2>Access millions of research articles, instantly</h2>\n" +
    "            <p>\n" +
    "                Unpaywall users are able to read over <strong>52%</strong> of research papers for free--without having to pay money, fuss with a VPN, or use pirate sites like Sci-Hub. That's because we're built on a database of millions of open-access articles harvested from thousands of servers worldwide.   When you browse to a paywalled paper, we check to see if we have a free copy. If we do, you'll see a green tab...just click, and read.\n" +
    "            </p>\n" +
    "\n" +
    "        </div>\n" +
    "        <img src=\"static/img/many-articles.png\" class=\"illustration\" alt=\"\">\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"testimonials-section\">\n" +
    "        <div class=\"testimonials-header\">\n" +
    "            <h2>What people are saying about Unpaywall:</h2>\n" +
    "        </div>\n" +
    "        <div class=\"testimonials\">\n" +
    "            <div class=\"testimonial\">\n" +
    "                <img src=\"static/img/tom.jpg\" alt=\"\">\n" +
    "                <div class=\"copy\">\n" +
    "                    Yesterday I found Unpaywall, and my life changed.  I've already gotten 4 publications by clicking on the Mystical Green Padlock...Thank you, from the heart.\n" +
    "                    <div class=\"attribution\">\n" +
    "                        <div class=\"name\">&mdash;Tom Mueller,</div>\n" +
    "                        <div class=\"job\">Freelance Author</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"testimonial\">\n" +
    "                <img src=\"static/img/jon.jpg\" alt=\"\">\n" +
    "                <div class=\"copy\">\n" +
    "                    Way, way, WAY easier than having to be at a place with institutional access, using a VPN, emailing authors, using inter-library loan...\n" +
    "                    <div class=\"attribution\">\n" +
    "                        <div class=\"name\">&mdash;Jon Tennant,</div>\n" +
    "                        <div class=\"job\">Paleontologist</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"testimonial\">\n" +
    "                <img src=\"static/img/stacy.jpg\" alt=\"\">\n" +
    "                <div class=\"copy\">\n" +
    "                    Unpaywall makes it really easy to (legally!) find free versions of journal articles.\n" +
    "                    <div class=\"attribution\">\n" +
    "                        <div class=\"name\">&mdash;Stacy Konkiel,</div>\n" +
    "                        <div class=\"job\">Altmetric</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"footer-container\" ng-include=\"'footer.tpl.html'\"></div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("page-not-found.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page-not-found.tpl.html",
    "<div class=\"landing static-page\">\n" +
    "    <h1>Sorry, we couldn't find that page!</h1>\n" +
    "\n" +
    "</div>");
}]);

angular.module("sources.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sources.tpl.html",
    "<div class=\"ti-page-header\" ng-include=\"'header.tpl.html'\"></div>\n" +
    "\n" +
    "<div class=\"page sources\">\n" +
    "    <div class=\"content\">\n" +
    "        <h1>\n" +
    "            <span class=\"text\">\n" +
    "                Sources\n" +
    "            </span>\n" +
    "        </h1>\n" +
    "\n" +
    "        <div class=\"header\">\n" +
    "            <p>\n" +
    "                Unpaywall finds OA content in many ways, including using data from open indexes like Crossref and DOAJ where it exists. However, the majority of our OA content comes from independently monitoring over 50,000 unique online content hosting locations, including Gold OA journals, Hybrid journals, institutional repositories, and disciplinary repositories. You can search through our sources below, or\n" +
    "                <a href=\"http://api.oadoi.org/data/sources.csv\">download the complete sources list.</a>\n" +
    "            </p>\n" +
    "\n" +
    "            <p>\n" +
    "                If you'd like to add your repository or journal to our list of sources, that's great! You can submit your repository for indexing via\n" +
    "                <a href=\"https://docs.google.com/forms/d/15o4RpUUfCUyauTt2DniLG23CWfDZ243Q1H7u6NX5zL8\">\n" +
    "                    this form,\n" +
    "                </a> and submit your journal <a href=\"mailto:team@impactstory.org\">via email.</a>\n" +
    "            </p>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"main\">\n" +
    "            <form class=\"form-inline\">\n" +
    "                <div class=\"input-row\">\n" +
    "                    <md-input-container class=\"md-block input\">\n" +
    "                        <label>Search for an OA source</label>\n" +
    "                        <input ng-model=\"searchTerm\" id=\"search-input\">\n" +
    "                    </md-input-container>\n" +
    "                    <md-progress-circular\n" +
    "                            ng-show=\"search.waiting\"\n" +
    "                            md-diameter=\"30\"\n" +
    "                            md-mode=\"indeterminate\"></md-progress-circular>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "            </form>\n" +
    "\n" +
    "            <div class=\"search-results waiting-{{search.waiting}}\">\n" +
    "                <h3 class=\"num-results\" ng-show=\"search.lastTerm\">\n" +
    "                    {{ search.results.length + search.numTruncated }} results for \"{{ search.lastTerm }}\"\n" +
    "                </h3>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"result\" ng-repeat=\"result in search.results\">\n" +
    "                    <div class=\"name\">\n" +
    "                        <span class=\"name\">{{result.repository_name}}</span>\n" +
    "                        <a href=\"{{result.home_page}}\">\n" +
    "                            <i class=\"fa fa-external-link\"></i>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <div class=\"host\">\n" +
    "                        {{result.institution_name}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"truncated\" ng-show=\"search.numTruncated\">\n" +
    "                    <div class=\"icon\">\n" +
    "                        <i class=\"fa fa-exclamation-triangle\"></i>\n" +
    "                    </div>\n" +
    "                    <div class=\"msg\">\n" +
    "                        <h3>\n" +
    "                            Hiding {{ search.numTruncated }} additional results matching\n" +
    "                            <em class=\"term\">\"{{ search.lastTerm }}\"</em>\n" +
    "                        </h3>\n" +
    "                        <div class=\"extra-msg\">\n" +
    "                            Try a more specific search term to narrow results further.\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"footer-container\" ng-include=\"'footer.tpl.html'\"></div>");
}]);

angular.module("welcome.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("welcome.tpl.html",
    "<div class=\"ti-page-header welcome\" ng-include=\"'header.tpl.html'\"></div>\n" +
    "<div class=\"page welcome\">\n" +
    "    <div class=\"content\">\n" +
    "\n" +
    "        <img id=\"screenshot\" src=\"static/img/laptop-screenshot.png\" alt=\"\">\n" +
    "        <p>\n" +
    "            Welcome to Unpaywall! When you see the\n" +
    "            <span class=\"tab-color green\">green tab</span>\n" +
    "            beside a research article,\n" +
    "            click it to read the full text. Try this example:\n" +
    "        </p>\n" +
    "        <p class=\"eg\">\n" +
    "            <a class=\"eg\" target=\"_blank\" href=\"http://www.nature.com/nature/journal/v542/n7642/full/nature21360.html\">\n" +
    "                <i class=\"fa fa-file-text-o\"></i>\n" +
    "                Try it now\n" +
    "            </a>\n" +
    "        </p>\n" +
    "        <p>\n" +
    "            <!--\n" +
    "            That article will cost you $32 to read on Nature.com...except now that\n" +
    "            you've got Unpaywall, it's free!\n" +
    "            -->\n" +
    "\n" +
    "            You'll see our green tab on about half of articles\n" +
    "            (if we can't find fulltext, you'll see a\n" +
    "            <span class=\"tab-color gray\">gray tab</span>\n" +
    "\n" +
    "            ). Happy reading!\n" +
    "\n" +
    "        </p>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <p class=\"ps\">\n" +
    "            PS for the Open Access nerds: the Unpaywall tab\n" +
    "            can change colors to indicate Green or Gold OA, too. Enable it in settings.\n" +
    "            You might also enjoy\n" +
    "            <a href=\"https://peerj.com/preprints/3119v1/\">our recent paper</a>\n" +
    "            analyzing trends in OA and the coverage\n" +
    "            of Unpaywall.\n" +
    "        </p>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"footer-container\" ng-include=\"'footer.tpl.html'\"></div>\n" +
    "");
}]);

angular.module('templates.app', ['landing.tpl.html', 'page-not-found.tpl.html']);

angular.module("landing.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("landing.tpl.html",
    "<div class=\"page landing\">\n" +
    "    <div class=\"top-screen\" layout=\"row\" layout-align=\"center center\">\n" +
    "        <div class=\"content\">\n" +
    "            <img src=\"static/img/logo.png\" alt=\"\">\n" +
    "            <div class=\"tagline\">\n" +
    "                Get links to open-access fulltext when you view paywalled research.\n" +
    "            </div>\n" +
    "\n" +
    "            <a href=\"https://chrome.google.com/webstore/detail/unpaywall/iplffkdpngmdjhlpjmppncnlhomiipha\"\n" +
    "               class=\"main-button\">\n" +
    "                <i class=\"fa fa-chrome\"></i>\n" +
    "                Install it free\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("page-not-found.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page-not-found.tpl.html",
    "<div class=\"landing static-page\">\n" +
    "    <h1>Sorry, we couldn't find that page!</h1>\n" +
    "\n" +
    "</div>");
}]);

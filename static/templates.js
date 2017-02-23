angular.module('templates.app', ['landing.tpl.html', 'page-not-found.tpl.html', 'wood.tpl.html']);

angular.module("landing.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("landing.tpl.html",
    "<div class=\"page landing\">\n" +
    "    <div class=\"top-screen screen\" layout=\"row\" layout-align=\"center center\">\n" +
    "        <div class=\"navbar\">\n" +
    "            <img id=\"logo\" src=\"static/img/logo.png\" alt=\"\">\n" +
    "            <a class=\"more\" href=\"\">\n" +
    "                <i class=\"fa fa-question-circle-o\"></i>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"content\">\n" +
    "            <div class=\"tagline\">\n" +
    "                Find open-access versions of paywalled research papers, instantly.\n" +
    "            </div>\n" +
    "\n" +
    "            <a href=\"https://chrome.google.com/webstore/detail/unpaywall/iplffkdpngmdjhlpjmppncnlhomiipha\"\n" +
    "               class=\"main-button\">\n" +
    "                <i class=\"fa fa-chrome\"></i>\n" +
    "                <span class=\"text\">\n" +
    "                    <span class=\"big\">\n" +
    "                        Install it free\n" +
    "                    </span>\n" +
    "                    <span class=\"small\">\n" +
    "                        at the Chrome Web Store\n" +
    "                    </span>\n" +
    "                </span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"about-screen screen\">\n" +
    "        <div class=\"content\">\n" +
    "            <h2>About</h2>\n" +
    "            <p>\n" +
    "                Ever get stopped by a paywall from reading a scholarly article?\n" +
    "                UnPaywall is here to help.\n" +
    "                <!--\n" +
    "                It’s easy to use: just install the browser extension\n" +
    "                from the Chrome App store, and keep browsing like you normally do.\n" +
    "                -->\n" +
    "\n" +
    "                Every time you view a paywalled article, we’ll automatically\n" +
    "                look for a copy in our index\n" +
    "                of over 20 million free, legal fulltext PDFs.\n" +
    "                If we find one, we give you a link and you read. Open access has never been easier.\n" +
    "            </p>\n" +
    "        </div>\n" +
    "        <div class=\"content\">\n" +
    "            <h2>FAQ</h2>\n" +
    "            <dl>\n" +
    "                <dt>Where does your data come from?</dt>\n" +
    "                <dt>\n" +
    "\n" +
    "                </dt>\n" +
    "                <dt>Who are you, and why are you doing this?</dt>\n" +
    "                <dt>\n" +
    "\n" +
    "                </dt>\n" +
    "                <dt>How often does UnPaywall actually find a free PDF for a given article?</dt>\n" +
    "                <dt>\n" +
    "\n" +
    "                </dt>\n" +
    "                <dt>How is this different from Sci-Hub?</dt>\n" +
    "                <dt>\n" +
    "\n" +
    "                </dt>\n" +
    "                <dt>I found a bug</dt>\n" +
    "                <dt>\n" +
    "\n" +
    "                </dt>\n" +
    "\n" +
    "            </dl>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
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

angular.module("wood.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("wood.tpl.html",
    "<div class=\"page wood\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"icon-for-copy\">\n" +
    "        <i class=\"fa fa-envelope-o\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <table>\n" +
    "        <tr class=\"header\">\n" +
    "            <th class=\"check\">check</th>\n" +
    "            <th class=\"name\">Name</th>\n" +
    "            <th class=\"oa\">OA</th>\n" +
    "            <th class=\"boost\">Potential OA Boost</th>\n" +
    "            <th class=\"cites impact\">\n" +
    "                <div class=\"main\">Cites</div>\n" +
    "                <div class=\"below\">\n" +
    "                    <span class=\"now\">now</span>\n" +
    "                    <span class=\"oa\"><i class=\"fa fa-arrow-up\"></i> oa</span>\n" +
    "                </div>\n" +
    "            </th>\n" +
    "            <th class=\"downloads impact\">\n" +
    "                <div class=\"main\">Downloads</div>\n" +
    "                <div class=\"below\">\n" +
    "                    <span class=\"now\">now</span>\n" +
    "                    <span class=\"oa\"><i class=\"fa fa-arrow-up\"></i> oa</span>\n" +
    "                </div>\n" +
    "            </th>\n" +
    "            <th class=\"altmetrics impact\">\n" +
    "                <div class=\"main\">Altmetrics</div>\n" +
    "                <div class=\"below\">\n" +
    "                    <span class=\"now\">now</span>\n" +
    "                    <span class=\"oa\"><i class=\"fa fa-arrow-up\"></i> oa</span>\n" +
    "                </div>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "\n" +
    "        <!-- reprobate -->\n" +
    "        <tr class=\"low-oa\">\n" +
    "            <td class=\"check\"><i class=\"fa fa-check-square-o\"></i></td>\n" +
    "            <td class=\"name\">Cindy Cortez</td>\n" +
    "            <td class=\"oa\">6<span class=\"percent\">%</span></td>\n" +
    "            <td class=\"boost high\"><i class=\"fa fa-arrow-up\"></i> High</td>\n" +
    "            <td>\n" +
    "                <span class=\"now cites\">1021</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>51</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">306k</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>294k</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">51</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>48</span>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <!-- Joe Average -->\n" +
    "        <tr class=\"med-oa\">\n" +
    "            <td class=\"check\"><i class=\"fa fa-check-square-o\"></i></td>\n" +
    "            <td class=\"name\">Doris Nguyen</td>\n" +
    "            <td class=\"oa\">31<span class=\"percent\">%</span></td>\n" +
    "            <td class=\"boost med\"><i class=\"fa fa-arrow-up\"></i> Medium</td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">998</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>36</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">399k</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>199k</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">63</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>38</span>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <!-- Joe Average Again -->\n" +
    "        <tr class=\"med-oa\">\n" +
    "            <td class=\"check\"><i class=\"fa fa-check-square-o\"></i></td>\n" +
    "            <td class=\"name\">Luther Peterson</td>\n" +
    "            <td class=\"oa\">27<span class=\"percent\">%</span></td>\n" +
    "            <td class=\"boost med\"><i class=\"fa fa-arrow-up\"></i> Medium</td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">1013</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>35</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">384k</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>185k</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">68</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>37</span>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <!-- more highly-cited person -->\n" +
    "        <!--\n" +
    "        <tr class=\"med-oa\">\n" +
    "            <td class=\"check\"><i class=\"fa fa-check-square-o\"></i></td>\n" +
    "            <td class=\"name\">Marion Sherman</td>\n" +
    "            <td class=\"oa\">21<span class=\"percent\">%</span></td>\n" +
    "            <td class=\"boost med\"><i class=\"fa fa-arrow-up\"></i> Medium</td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">2029</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>71</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">727k</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>379</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">133</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>74</span>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        -->\n" +
    "\n" +
    "        <!-- OA Fan -->\n" +
    "        <tr class=\"high-oa\">\n" +
    "            <td class=\"check\"><i class=\"fa fa-square-o\"></i></td>\n" +
    "            <td class=\"name\">Alex Lee</td>\n" +
    "            <td class=\"oa\">96<span class=\"percent\">%</span></td>\n" +
    "            <td class=\"boost low\"><i class=\"fa fa-arrow-up\"></i> Low</td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">1584</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>3</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">951k</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>19k</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">154</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>6</span>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        <!-- TOTAL -->\n" +
    "        <tr class=\"total\">\n" +
    "            <td class=\"check\"><i class=\"fa fa-square-o\"></i></td>\n" +
    "            <td class=\"name\">All Selected</td>\n" +
    "            <td class=\"oa\">32<span class=\"percent\">%</span></td>\n" +
    "            <td class=\"boost med\"><i class=\"fa fa-arrow-up\"></i> Medium</td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">4616</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>125</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">2.1M</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>697k</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span class=\"now\">336</span>\n" +
    "                <span class=\"boost\"><span class=\"plus\">+</span>129</span>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

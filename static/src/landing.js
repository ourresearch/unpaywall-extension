angular.module('landing', [
    'ngRoute',
    'ngMessages'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: "landing.tpl.html",
            controller: "LandingPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/landing/:landingPageName', {
            templateUrl: "landing.tpl.html",
            controller: "LandingPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: "welcome.tpl.html",
            controller: "WelcomePageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/faq', {
            templateUrl: "faq.tpl.html",
            controller: "FaqPageCtrl"
        })
    })





    .config(function ($routeProvider) {
        $routeProvider.when('/page-not-found', {
            templateUrl: "page-not-found.tpl.html",
            controller: "PageNotFoundCtrl"
        })
    })

    .controller("PageNotFoundCtrl", function($scope){
        console.log("PageNotFound controller is running!")

    })
    .controller("FaqPageCtrl", function($scope, $anchorScroll){
        console.log("FaqPageCtrl controller is running!")


    })


    .controller("WelcomePageCtrl", function($scope, $timeout){
        console.log("WelcomePageCtrl controller is running!")
        $timeout(function(){
            if (document.getElementById("unpaywall-is-installed")){
                console.log("unpaywall is installed!")
                ga("send", "event", "welcome after install")
            }
        }, 1500)

    })


    .controller("LandingPageCtrl", function ($scope,
                                             $document,
                                             $http,
                                             $location,
                                             $rootScope,
                                             $mdDialog,
                                             $timeout) {


        // support legacy faq hack
        if ($location.search().faq){
            $location.url("/faq")
        }


        // set the browser
        var ua = navigator.userAgent
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)
        var browser


        // firefox works on desktop and android. but don't handle that
        // for now. fix this later.
        if (ua.indexOf("Firefox") > -1 && !isMobile) {
            browser = "firefox"
        }

        // chrome works on desktop only
        else if (ua.indexOf("Chrome") > -1 && !isMobile) {
            browser = "chrome"
        }

        else {
            browser = "unsupported"
        }



        $scope.browser = browser



        $scope.ctaClick = function(){
            console.log("clicked to install the extension")


            // can't install it, so let's tweet it.
            if (browser == 'unsupported') {
                var tweetUrl = "https://twitter.com/intent/tweet?url=http://unpaywall.org&text=Check out the free Unpaywall browser extension%3A it instantly unlocks free, legal versions of paywalled research papers. %23openaccess"
                window.location = tweetUrl
            }


            // install for firefox. for now that just means just tell them it's coming soon.
            else if (browser == 'firefox') {
                ga("send", "event", "Clicked Install", "firefox")
                var webstoreUrl = "https://addons.mozilla.org/en-US/firefox/addon/unpaywall/"
                window.location = webstoreUrl


                //$mdDialog.show({
                //  controller: function($scope, $mdDialog){
                //      console.log("dialog ctrl!")
                //      $scope.cancel = function(){
                //          $mdDialog.cancel()
                //      }
                //  },
                //  templateUrl: 'firefox-coming-soon.tpl.html',
                //  clickOutsideToClose:true,
                //    parent: angular.element(document.body)
                //})
            }

            // install for chrome
            else if (browser == 'chrome') {
                console.log("Install for Chrome")
                ga("send", "event", "Clicked Install", "chrome")
                var webstoreUrl = "https://chrome.google.com/webstore/detail/unpaywall/iplffkdpngmdjhlpjmppncnlhomiipha"

                // inline install does not work in fullscreen mode.
                if( window.outerHeight == screen.height) {
                    console.log("full screen! opening web store")
                    window.location = webstoreUrl
                }

                chrome.webstore.install(
                    undefined,
                    function(msg){
                        console.log("inline install success.")
                        ga("send", "event", "Installed", "chrome")
                        $http.post("/log/install", {})
                    },
                    function(msg) {
                        window.location = webstoreUrl
                        ga("send", "event", "Install cancelled", "chrome")
                        console.log("inline install failure. redirecting to webstore. ", msg)
                    }
                )

            }
            else {
                console.log("um not sure how we got here...")
            }
        }

    })














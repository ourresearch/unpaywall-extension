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

    .controller("WelcomePageCtrl", function($scope){
        console.log("WelcomePageCtrl controller is running!")

    })


    .controller("LandingPageCtrl", function ($scope,
                                             $document,
                                             $location,
                                             $rootScope,
                                             $mdDialog,
                                             $timeout) {

        console.log("i am the landing page ctrl")

        console.log("location.search", $location.search())
        if ($location.search().faq){
            $location.url("/faq")
        }

        $scope.ctaClick = function(browser){
            ga("send", "event", "Clicked Install", browser)
        }

        $scope.fxAddon = function($event){
            ga("send", "event", "Clicked Install", "firefox")

            $mdDialog.show({
              controller: function($scope, $mdDialog){
                  console.log("dialog ctrl!")
                  $scope.cancel = function(){
                      $mdDialog.cancel()
                  }
              },
              templateUrl: 'firefox-coming-soon.tpl.html',
              targetEvent: $event,
              clickOutsideToClose:true,
                parent: angular.element(document.body)
            })

            $event.preventDefault()


        }

    })











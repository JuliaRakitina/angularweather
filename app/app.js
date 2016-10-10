'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ui.router',
    'myApp.version',
    'ngMaterial',
    'vsGoogleAutocomplete',
    'jtt_openweathermap',
    'ngAnimate',
    'ngResource'
]);
app.run(['$state', '$stateParams','$rootScope',
    function ( $state, $stateParams,$rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);
app.config(['$urlRouterProvider', '$stateProvider','$mdThemingProvider', function ($urlRouterProvider, $stateProvider,$mdThemingProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home/home.html',
            controller: 'HomeCtl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about/about.html',
            controller: 'AboutCtl'
        })

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

}]);

app.controller('MainNavCtl', ["$rootScope", "$scope", "$state", "$stateParams",function ($rootScope, $scope, $state, $stateParams) {
    $scope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $scope.currentNavItem = toState.name;
        });


}]);

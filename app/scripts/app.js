'use strict';

/**
 * @ngdoc overview
 * @name undimswebApp
 * @description
 * # undimswebApp
 *
 * Main module of the application.
 */
angular
  .module('undimswebApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngMaterial'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $mdThemingProvider) {
    $stateProvider.state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'LoginCtrl'
      })
      .state('app', {
        url: '/',
        abstract: true,
        templateUrl: "views/main.html",
        controller: "MainCtrl"
      })
      .state('app.home', {
        url: "",
        templateUrl: "views/home.html",
        controller: 'HomeCtrl'
      })
      .state('app.about', {
        url: 'about',
        templateUrl: "views/about.html",
        controller: "AboutCtrl"
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
    $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('light-green');
  }).run(function ($rootScope, $timeout) {
    /* Loading Bar at top*/
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      return $rootScope.loading = true;
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
      return $timeout(function () {
        return $rootScope.loading = false;
      }, 1000);
    });
    /* END Loading Bar at top*/
  });

var SERVER_URL = 'http://54.243.4.179/v1/';

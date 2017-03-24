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
    'ui.router',
    'ngMaterial'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $cookiesProvider, $mdThemingProvider) {
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
  }).run(function ($rootScope, $timeout, $cookies, $state) {
    /* Loading Bar at top*/
    /* Login Check */
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      if (toState.name.indexOf('app') > -1) {
        if (!$cookies.get('token')) {
          event.preventDefault();
          $state.go('login');
        }
        $rootScope.loading = true;
      }
    });
    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams, options) => $timeout(() => $rootScope.loading = false, 1000));
    /* END Loading Bar at top*/
  });

const SERVER_URL = 'http://54.243.4.179/v1/';

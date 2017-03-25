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
    'ngMaterial',
    'angular-loading-bar'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $cookiesProvider, cfpLoadingBarProvider, $mdThemingProvider) {
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
      .state('app.profile', {
        url: "profile",
        templateUrl: "views/profile.html",
        controller: 'ProfileCtrl'
      })
      .state('app.about', {
        url: 'about',
        templateUrl: "views/about.html",
        controller: "AboutCtrl"
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
    cfpLoadingBarProvider.includeSpinner = false;
  }).run(function ($rootScope, $timeout, $cookies, $state) {
    /* Login Check */
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      if (toState.name.indexOf('app') > -1 && !$cookies.get('token')) {
        event.preventDefault();
        $state.go('login');
      }
    });
  });

const SERVER_URL = 'http://54.243.4.179/v1/';

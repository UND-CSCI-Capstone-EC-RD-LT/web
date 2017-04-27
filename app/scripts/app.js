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
    'angular-loading-bar',
    'md.data.table',
    'chart.js',
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
      .state('app.stats', {
        url: "stats",
        templateUrl: "views/stats.html",
        controller: 'StatsCtrl'
      })
      .state('app.departments', {
        url: "departments",
        templateUrl: "views/departments.html",
        controller: 'DepartmentsCtrl'
      })
      .state('app.buildings', {
        url: "buildings",
        templateUrl: "views/buildings.html",
        controller: 'BuildingsCtrl'
      })
      .state('app.rooms', {
        url: "rooms",
        templateUrl: "views/rooms.html",
        controller: 'RoomsCtrl'
      })
      .state('app.itemtypes', {
        url: "itemtypes",
        templateUrl: "views/itemType.html",
        controller: 'ItemTypesCtrl'
      })
      .state('app.about', {
        url: 'about',
        templateUrl: "views/about.html",
        controller: "AboutCtrl"
      })
      .state('app.users', {
        url: 'users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .state('app.item', {
        url: 'item/:id',
        templateUrl: 'views/item.html',
        controller: 'ItemCtrl'
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
    cfpLoadingBarProvider.includeSpinner = false;
  }).run(function ($rootScope, $timeout, $cookies, $state, Auth) {
    /* Login Check */
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      if (toState.name.indexOf('app') > -1 && !Auth.get('token')) {
        event.preventDefault();
        $state.go('login');
      } else {
        Auth.refreah();
      }
    });
  });

const SERVER_URL = 'http://54.243.4.179/v1/';
//const SERVER_URL = 'http://127.0.0.1:3000/v1/';

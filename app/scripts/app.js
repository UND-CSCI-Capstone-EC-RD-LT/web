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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/add-user', {
        templateUrl: 'views/adduser.html',
        controller: 'AdduserCtrl',
        controllerAs: 'addUser'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

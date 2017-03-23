'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp')
  .controller('MainCtrl', function ($scope, $state, $cookies, $timeout) {
    console.log('MainCtrl');
    // (!$cookies.get('user') || $cookies.get('user') == null || $cookies.get('token') == null) {
    if (!$cookies.get('token')) {
      $state.go('login');
    }

    $scope.logout = () => {
      for (var key in $cookies.getAll()) { $cookies.remove(key); }
      $state.go('login');
    }
  });

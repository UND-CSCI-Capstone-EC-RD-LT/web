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
    if (!$cookies.get('token')) {
      $state.go('login');
    }

    $scope.logout = function () {
      for (var key in $cookies.getAll()) { $cookies.remove(key); }
      $state.go('login');
    }
  });

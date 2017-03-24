'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp')
  .controller('MainCtrl', function ($scope, $state, $cookies, $mdSidenav) {
    if (!$cookies.get('token')) {
      $state.go('login');
    }

    $scope.user = JSON.parse($cookies.get('user'));

    $scope.logout = function () {
      for (var key in $cookies.getAll()) { $cookies.remove(key); }
      $state.go('login');
    };

    $scope.toggleMenu = function () {
      $mdSidenav('left').toggle();
    };

  });

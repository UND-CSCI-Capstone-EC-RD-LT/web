'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('HomeCtrl', function ($scope, $User, $Item, Toast) {

  $Item.search(1, 1, 1).then(function (res) {
    $scope.items = res.data;
  }, function (error) {
    Toast.error({
      content: { details: { error } }
    });
  });

  /* Exmaples of the User Provider */
  /*
  $User.getAll().then(function (res) {
    console.log(res.data);
  }, function (error) {
    Toast.error({
      content: { details: { error } }
    });
  });
  */
});

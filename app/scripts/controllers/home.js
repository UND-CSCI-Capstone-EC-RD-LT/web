'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('HomeCtrl', function ($User, Toast) {

  /* Exmaples of the User Provider */
  /*
  $User.getUser(1).then(function (res) {
    console.log(res.data);
  }, function (error) {
    Toast.error({
      content: { details: { error } }
    });
  });

  $User.getUsers().then(function (res) {
    console.log(res.data);
  }, function (error) {
    Toast.error({
      content: { details: { error } }
    });
  });

  $User.addPermission(1).then(function (res) {
    console.log(res.data);
  }, function (error) {
    Toast.error({
      content: { details: { error } }
    });
  });

  $User.removePermission(1).then(function (res) {
    console.log(res.data);
  }, function (error) {
    Toast.error({
      content: { details: { error } }
    });
  });

  $User.updateUser(2, {
    username: "update"
  }).then(function (res) {
    console.log(res.data);
  }, function (error) {
    Toast.error({
      content: { details: { error } }
    });
  });

  $User.deleteUser(2).then(function (res) {
    console.log(res);
  }, function (error) {
    Toast.error({
      content: { details: { error } }
    });
  });
  */
});

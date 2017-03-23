'use strict';

/**
 * @ngdoc service
 * @name $User
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').
factory('$User', function ($http, $q) {
  return {
    signin: function (email, password) {
      return $http({
        method: 'POST',
        url: SERVER_URL + "auth/signin",
        headers: {
          'Content-Type': "application/json"
        },
        data: {
          email: email,
          password: password
        }
      }).then(function (data) {
        return data.data;
      }, function (error) {
        return $q.reject(error);
      });
    }
  };
});

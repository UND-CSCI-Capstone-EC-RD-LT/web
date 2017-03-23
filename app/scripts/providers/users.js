'use strict';

/**
 * @ngdoc service
 * @name $User
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').
factory('$User', function ($http, $q, $cookies) {
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
    },
    signup: function (email, password, username, firstname, lastname) {
      return $http({
        method: 'POST',
        url: SERVER_URL + "auth/signup",
        headers: {
          'Content-Type': "application/json"
        },
        data: {
          email: email,
          password: password,
          usernamer: username,
          firstname: firstname,
          lastname: lastname
        }
      }).then(function (data) {
        return data.data;
      }, function (error) {
        return $q.reject(error);
      });
    },
    getUser: function (id) {
      return $http({
        method: 'GET',
        url: SERVER_URL + "users/" + id,
        headers: {
          'Content-Type': "application/json",
          'Authorization': "JWT " + $cookies.get('token')
        }
      }).then(function (data) {
        return data.data;
      }, function (error) {
        return $q.reject(error);
      });
    },
    getUsers: function () {
      return $http({
        method: 'GET',
        url: SERVER_URL + "users/",
        headers: {
          'Content-Type': "application/json",
          'Authorization': "JWT " + $cookies.get('token')
        }
      }).then(function (data) {
        return data.data;
      }, function (error) {
        return $q.reject(error);
      });
    },
    addPermission: function (id) {
      return $http({
        method: 'PUT',
        url: SERVER_URL + "users/addPermission",
        headers: {
          'Content-Type': "application/json",
          'Authorization': "JWT " + $cookies.get('token')
        },
        data: {
          permission: id
        }
      }).then(function (data) {
        return data.data;
      }, function (error) {
        return $q.reject(error);
      });
    },
    removePermission: function (id) {
      return $http({
        method: 'PUT',
        url: SERVER_URL + "users/removePermission",
        headers: {
          'Content-Type': "application/json",
          'Authorization': "JWT " + $cookies.get('token')
        },
        data: {
          permission: id
        }
      }).then(function (data) {
        return data.data;
      }, function (error) {
        return $q.reject(error);
      });
    },
    updateUser: function (id, data) {
      return $http({
        method: 'PUT',
        url: SERVER_URL + "users/" + id,
        headers: {
          'Content-Type': "application/json",
          'Authorization': "JWT " + $cookies.get('token')
        },
        data: data
      }).then(function (data) {
        return data.data;
      }, function (error) {
        return $q.reject(error);
      });
    },
    deleteUser: function (id) {
      return $http({
        method: 'DELETE',
        url: SERVER_URL + "users/" + id,
        headers: {
          'Content-Type': "application/json",
          'Authorization': "JWT " + $cookies.get('token')
        },
        data: data
      }).then(function (data) {
        return data.data;
      }, function (error) {
        return $q.reject(error);
      });
    }
  };
});

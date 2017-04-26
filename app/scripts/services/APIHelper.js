'use strict';

/**
 * @ngdoc service
 * @name APIHelper
 * @description
 * Service to create a APIHelper
 */
angular.module('undimswebApp').service('APIHelper', function ($http, $q, $cookies, Auth) {
  return {
    call: (method, url, data) => {
      let req = {
        method: method,
        url: SERVER_URL + url,
        headers: { 'Content-Type': "application/json" }
      };
      if (Auth.get('token') && !req.headers.Authorization) { req.headers.Authorization = "JWT " + Auth.get('token'); }
      if (method === 'POST' || method === 'PUT' && data) { req.data = data; }
      return $http(req).then((data) => data.data, (error) => $q.reject(error));
    }
  };
});

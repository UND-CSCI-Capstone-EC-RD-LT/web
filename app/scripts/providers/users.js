'use strict';

/**
 * @ngdoc service
 * @name $User
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').factory('$User', function (APIHelper) {
  return {
    signin: (data) => APIHelper.call('POST', 'auth/signin'),
    signup: (data) => APIHelper.call('POST', 'auth/signup', data),
    get: (id) => APIHelper.call('GET', `users/${id}`),
    getAll: () => APIHelper.call('GET', 'users'),
    addPermission: (id) => APIHelper.call('PUT', 'users/addPermission', data),
    removePermission: (id) => APIHelper.call('PUT', 'users/removePermission', data),
    update: (id, data) => APIHelper.call('PUT', `users/${id}`, data),
    delete: (id) => APIHelper.call('DELETE', `users/${id}`)
  };
});

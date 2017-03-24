'use strict';

/**
 * @ngdoc service
 * @name $Permission
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').factory('$Permission', function (APIHelper) {
  return {
    create: (data) => APIHelper.call('POST', 'permissions', data),
    get: (number) => APIHelper.call('GET', `permissions/${number}`),
    getAll: (number) => APIHelper.call('GET', 'permissions'),
    update: (number, data) => APIHelper.call('PUT', `permissions/${number}`, data),
    delete: (number) => APIHelper.call('DELETE', `permissions/${number}`)
  };
});

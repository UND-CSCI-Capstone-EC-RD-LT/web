'use strict';

/**
 * @ngdoc service
 * @name $Department
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').factory('$Department', function (APIHelper) {
  return {
    create: (data) => APIHelper.call('POST', 'departments', data),
    get: (number) => APIHelper.call('GET', `departments/${number}`),
    getWithBuildings: (number) => APIHelper.call('GET', `departments/${number}/building`),
    getAll: () => APIHelper.call('GET', 'departments'),
    getAllWithBuildings: () => APIHelper.call('GET', `departments/building`),
    update: (number, data) => APIHelper.call('PUT', `departments/${number}`, data),
    delete: (number) => APIHelper.call('DELETE', `departments/${number}`)
  };
});

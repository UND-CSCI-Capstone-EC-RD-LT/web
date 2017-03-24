'use strict';

/**
 * @ngdoc service
 * @name $ItemType
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').factory('$ItemType', function (APIHelper) {
  return {
    create: (data) => APIHelper.call('POST', 'itemtypes', data),
    get: (number) => APIHelper.call('GET', `itemtypes/${number}`),
    getWithItems: (number) => APIHelper.call('GET', `itemtypes/${number}/items`),
    getAll: () => APIHelper.call('GET', 'itemtypes'),
    update: (number, data) => APIHelper.call('PUT', `itemtypes/${number}`, data),
    delete: (number) => APIHelper.call('DELETE', `itemtypes/${number}`)
  };
});

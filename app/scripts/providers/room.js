'use strict';

/**
 * @ngdoc service
 * @name $Room
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').factory('$Room', function (APIHelper) {
  return {
    create: (data) => APIHelper.call('POST', 'rooms', data),
    get: (number) => APIHelper.call('GET', `rooms/${number}`),
    getWithItems: (number) => APIHelper.call('GET', `rooms/${number}/item`),
    getWithItemsByType: (number, type) => APIHelper.call('GET', `rooms/${number}/item/${type}`),
    getAll: (number) => APIHelper.call('GET', 'rooms'),
    getAllWithItems: (number) => APIHelper.call('GET', 'rooms/item'),
    getAllByBuilding: (number) => APIHelper.call('GET', `rooms/building/${number}`),
    update: (number, data) => APIHelper.call('PUT', `rooms/${number}`, data),
    delete: (number) => APIHelper.call('DELETE', `rooms/${number}`)
  };
});

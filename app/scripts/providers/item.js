'use strict';

/**
 * @ngdoc service
 * @name $Item
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').factory('$Item', function (APIHelper) {
  return {
    create: (data) => APIHelper.call('POST', 'items', data),
    get: (number) => APIHelper.call('GET', `items/${number}`),
    getByBarcode: (barcode) => APIHelper.call('GET', `items/barcode/${barcode}`),
    getAll: (number) => APIHelper.call('GET', 'items'),
    search: (department, building, room) => APIHelper.call('GET', 'items/search/' + (department ? department : '') + (building ? `/${building}` : '') + (room ? `/${room}` : '')),
    update: (number, data) => APIHelper.call('PUT', `items/${number}`, data),
    delete: (number) => APIHelper.call('DELETE', `items/${number}`)
  };
});

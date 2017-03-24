'use strict';

/**
 * @ngdoc service
 * @name $Building
 * @description
 * Service to get data from server for Person
 */
angular.module('undimswebApp').factory('$Building', function (APIHelper) {
  return {
    create: (data) => APIHelper.call('POST', 'buildings', data),
    get: (number) => APIHelper.call('GET', `buildings/${number}`),
    getWithRooms: (number) => APIHelper.call('GET', `buildings/${number}/room`),
    getAll: () => APIHelper.call('GET', 'buildings'),
    getAllWithRooms: () => APIHelper.call('GET', `buildings/rooms`),
    getAllByDepartment: (number) => APIHelper.call('GET', `buildings/department/${number}`),
    update: (number, data) => APIHelper.call('PUT', `buildings/${number}`, data),
    delete: (number) => APIHelper.call('DELETE', `buildings/${number}`)
  };
});

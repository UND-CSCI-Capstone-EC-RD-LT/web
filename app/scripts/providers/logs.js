'use strict';

/**
 * @ngdoc service
 * @name $Logs
 * @description
 * Service to get data from server for Logs
 */
angular.module('undimswebApp').factory('$Logs', function (APIHelper) {
  return {
    get: (model, id) => APIHelper.call('GET', `logs/${model}${(id ? `/${id}` : '')}`),
    getAll: () => APIHelper.call('GET', 'logs'),
  };
});

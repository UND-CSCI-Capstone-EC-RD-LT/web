'use strict';

/**
 * @ngdoc service
 * @name Auth
 * @description
 * Service to create a Auth
 */
angular.module('undimswebApp').service('Auth', function ($cookies) {
  return {
    set: (token, user) => {
      let now = new Date();
      let expires = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 15);
      $cookies.put('token', token, { expires });
      $cookies.putObject('user', user, { expires });
    },
    updateUser: (user) => {
      let now = new Date();
      let expires = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 15);
      $cookies.putObject('user', user, { expires });
    },
    get: (type) =>  $cookies.get(type),
    getUser: () => $cookies.getObject('user'),
    refreah: () => {
      let now = new Date();
      let expires = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 15);
      $cookies.put('token', $cookies.get('token'), { expires });
      $cookies.putObject('user', $cookies.getObject('user'), { expires });
    },
    delete: () => {
      for (let key in $cookies.getAll()) { $cookies.remove(key); }
    }
  };
});

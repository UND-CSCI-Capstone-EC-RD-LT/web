'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('StatsCtrl', function($scope, $Logs) {
  const fixTimestamp = (data) => data.map((item) => {
    item.timestamp = moment(item.createdAt);
    delete item.updatedAt;
    delete item.createdAt;
    return item;
  });
  const hoursBack = (data, hrs = 24) => data.filter((item) => moment().unix() >= item.timestamp.unix() && moment().unix() - (60 * 60 * hrs) <= item.timestamp.unix() );
  const setupData = (data) => {
      let output = {};
      data.forEach((item) => {
        if(!output[item.model]) output[item.model] = {};
        if(!output[item.model][item.action]) output[item.model][item.action] = [];
        output[item.model][item.action].push(item);
      });
    return output;
  };

  const line24 = (data) => {
    let output = {
      "labels" : ['01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM',  '12:00 AM'],
      "series" : [],
      "data" : []
    }

    for (let i in data) {
      if (!output.series.includes(i)) output.series.push(i);
    }

    output.data = [...new Array(output.series.length)].map((item) => new Array(24).fill(0));

    for (let i in data) {
      for (let j in data[i]) {
        for ( let l in data[i][j]) output.data[output.series.indexOf(i)][data[i][j][l].timestamp.hour()]++;
      }
    }
    return output;
  };

  const line7 = (data) => {
    let output = {
      "labels" : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      "series" : [],
      "data" : []
    }

    for (let i in data) {
      if (!output.series.includes(i)) output.series.push(i);
    }

    output.data = [...new Array(output.series.length)].map((item) => new Array(7).fill(0));

    for (let i in data) {
      for (let j in data[i]) {
        for ( let l in data[i][j]) output.data[output.series.indexOf(i)][data[i][j][l].timestamp.day()]++;
      }
    }
    return output;
  };

  $Logs.getAll().then((res) => {
    $scope.logs = {};
    $scope.day = setupData(hoursBack(fixTimestamp(res.data), 24));
    $scope.week = setupData(hoursBack(fixTimestamp(res.data), (24 *7)));
    //$scope.activity = line24($scope.day); //Last Day View
    $scope.activity = line7($scope.week); //Last Week
    console.log($scope.activity);
  });

  $scope.changeGraph = (type) => $scope.activity = type === 7 ? line7($scope.week) : line24($scope.day);
});

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

  const radarActions = (data) => {
    let output = [...new Array($scope.activity.series.length)].map((item) => new Array($scope.actions.labels.length).fill(0));

    for (let i in data) {
      for( let j in data[i]) {
          let action = j === 'find' || j === 'findOne' || j === 'findone' ? 'search' : j;
          action = action === 'destroy' ? 'delete' : action;
          action = action === 'building' || action === 'department' ? 'update' : action;
          output[$scope.activity.series.indexOf(i)][$scope.actions.labels.indexOf(action)] += data[i][j].length;
      }
    }

    return output;
  };

  const usersData = (data) => {
    let output = {}

    data.forEach((item) => {
      let x = parseInt(item.timestamp.day());
      let y = parseInt(item.timestamp.hour());
      if(!output[x]) output[x] = [];
      if(!output[x][y]) output[x][y] = 5; else output[x][y]++;
    });

    let newData = [];
    for (let i in output) {
      for (let j in output[i]) {
        newData.push({ y: 6-i, x: j, r: output[i][j] });
      }
    }
    return newData;
  };


  let load;
	(load = () => {
    $Logs.getAll().then((res) => {
      $scope.logs = {};
      $scope.day = setupData(hoursBack(fixTimestamp(res.data), 24));
      $scope.week = setupData(hoursBack(fixTimestamp(res.data), (24 *7)));

      $scope.activity = line7($scope.week); //Last Week
      $scope.actions = {};
      $scope.actions.labels = ['create', 'delete', 'update', 'search'];
      $scope.actions.series = $scope.activity.series;
      $scope.actions.data = radarActions($scope.week);
    });

    $scope.users = {};
    $Logs.get('user').then((res) => {
      $scope.users.data = [usersData(fixTimestamp(res.data))];
      $scope.users.series = ['Normal User'];
      $scope.users.options = {
        responsive: true,
        title:{
            display: true,
            text:'User Frequency'
        },
        scales: {
          yAxes: [{
              ticks: {
                min: 0,
                max: 6,
                stepSize: 1,
                callback: (value, index, values) => {
                  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                  return days[index]
                }
              }
          }],
          xAxes: [{
            ticks: {
              min: 0,
              max: 23,
              stepSize: 1,
              callback: (value, index, values) => {
                let hours = ['01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM',  '12:00 AM'];
                return hours[index];
              }
            }
          }]
        }
      };
    });
	})();



  $scope.changeData = (type) => {
      $scope.activity = type === 7 ? line7($scope.week) : line24($scope.day);
      $scope.actions.data  = type === 7 ? radarActions($scope.week) : radarActions($scope.day);
  }
});

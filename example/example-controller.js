'use strict';

var ExampleCtrl = function($rootScope, $state, $scope) {

  $scope.initialise = function() {

    $scope.go = function(state) {
      $state.go(state);
    };

    $scope.tabData   = [
      {
        heading: 'Settings',
        route:   'user.settings'
      },
      {
        heading: 'Accounts',
        route:   'user.accounts'
      }
    ];
  };

  $scope.initialise();
};

angular.module('example').controller('ExampleCtrl', ExampleCtrl);

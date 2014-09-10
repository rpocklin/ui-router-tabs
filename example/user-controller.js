'use strict';

var UserCtrl = function($rootScope, $scope) {

  $scope.initialise = function() {

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

angular.module('example').controller('UserCtrl', UserCtrl);

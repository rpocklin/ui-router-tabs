'use strict';

var app = angular.module('example', [
  'ui.router',
  'ui.bootstrap',
  'ui.router.tabs'
]);

app.config(function($stateProvider) {

  $stateProvider.state('user', {
    url:         '',
    controller: 'UserCtrl',
    templateUrl: 'example.html'
  }).state('user.settings', {
    url:         '/user/settings',
    templateUrl: 'user/settings.html'
  }).state('user.accounts', {
    url:         '/user/accounts',
    templateUrl: 'user/accounts.html'
  });

});
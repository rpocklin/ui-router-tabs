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
    templateUrl: 'user/settings.html',
    controller: 'SettingsCtrl'
  }).state('user.accounts', {
    url:         '/user/accounts',
    templateUrl: 'user/accounts.html'
  }).state('user.settings.one', {
    url:         '/user/settings',
    template: '<div>one</div>'
  }).state('user.accounts.two', {
    url:         '/user/accounts',
    template: '<div>two</div>'
  });

});
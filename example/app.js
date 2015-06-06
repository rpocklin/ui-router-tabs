'use strict';

var app = angular.module('example', [
  'ui.router',
  'ui.bootstrap',
  'ui.router.tabs'
]);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state(
  'articledetail', {
    url: '', templateUrl: 'example.html',
    controller: 'ArticleDetailController'
  }),
  $stateProvider.state(
  'articledetail.tab1', {
    url: '/tab1', templateUrl: '/articledetail/tab1.html'
  }
  ).state(
  'articledetail.tab2', {
    url: '/tab2', templateUrl: '/articledetail/tab2.html'
  }
  ).state(
  'articledetail.tab3', {
    url: '/tab3', templateUrl: '/articledetail/tab3.html'
  }
  ).state(
  'articledetail.tab4', {
    url: '/tab4', templateUrl: '/articledetail/tab4.html'
  }
  ).state(
  'error', {
    url: '/error', templateUrl: '/error/error.html'
  });

}]);



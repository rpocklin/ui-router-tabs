'use strict';

var ExampleCtrl = ['$rootScope', '$state', '$scope', '$stateParams', function($rootScope, $state, $scope) {

  $scope.initialise = function() {


    $scope.go = function(state) {
      $state.go(state);
    };

    $scope.tabData   = [
      {
        heading: 'Algemene info',
        route:   'articledetail.tab1'
      },
      {
        heading: 'Info 2',
        route:   'articledetail.tab2'
      },
      {
        heading: 'Info 3',
        route:   'articledetail.tab3'
      },
      {
        heading: 'Info 4',
        route:   'articledetail.tab4'
      }
    ];

    $scope.articleId = 3;
    $state.go('articledetail.tab' + $scope.articleId);

  };

  $scope.initialise();

}];

angular.module('example').controller('ArticleDetailController', ExampleCtrl);

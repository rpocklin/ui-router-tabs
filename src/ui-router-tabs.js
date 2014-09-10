'use strict';

/**
 * Permits declarative (and dynamic) definitions of tab links with full routes.
 *
 * requires 'ui.router' and 'ui.bootstrap'
 * (uses tabset and tab directives in ui.bootstrap and route changes in ui.router)
 *
 * NOTE: suggest to load any common model in the parent controller.resolve
 * and you don't have to make the parent view abstract - it will default to the first tab.
 *
 * If you don't want this, link to the page via your desired tab child state directly.
 *
 * You can define (for styling) the attributes type="pills" and vertical="true | false" and justified="true | false"
 *
 * See tab-directive.spec.js for usage examples.
 *
 * Author: Robert Pocklington (rpocklin@gmail.com)
 * License: MIT
 *
 */

angular.module('ui.router.tabs', []);
angular.module('ui.router.tabs').directive('tabs', function($state) {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      tabs: '=data', // can be dynamically updated
      type: '@',
      justified: '@',
      vertical: '@'
    },
    compile: function(element, attributes) {
      if (!attributes.data) {
        throw new Error('\'data\' attribute not defined, please check documentation for how to use this directive.');
      }
    },
    controller: function($scope) {

      $scope.go = function(route) {
        $state.go(route);
      };

      $scope.active = function(route) {
        return $state.is(route);
      };

      // sets which tab is active (used for highlighting)
      angular.forEach($scope.tabs, function(tab) {
        tab.active = $scope.active(tab.route);
      });

    },
    templateUrl: function(element, attributes) {
      return attributes.templateUrl || 'ui-router-tabs-default-template.html';
    }
  };
}).run(['$templateCache',
  function($templateCache) {
    var DEFAULT_TEMPLATE = '<div>' +
      '<tabset class="tab-container" type="{{type}}" vertical="{{vertical}}" justified="{{justified}}">' +
      '  <tab class="tab" ng-repeat="tab in tabs" heading="{{tab.heading}}" select="go(tab.route)" active="tab.active">' +
      '  </tab>' +
      '</tabset>' +
      '</div>';

    $templateCache.put('ui-router-tabs-default-template.html', DEFAULT_TEMPLATE);
}]);

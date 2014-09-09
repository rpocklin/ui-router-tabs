'use strict';

beforeEach(function() {

  module('templates');
  module('angular-ui-tabs-directive');
  module('ui.router');
  module('ui.bootstrap');

  module(function($stateProvider) {
    $stateProvider
      .state('menu', {
        url: '/menu',
        templateUrl: 'template.html'
      })
      .state('menu.route2', {
        url: '/route2',
        templateURl: 'template.html'
      }).state('menu.route1', {
        url: '/route1',
        templateUrl: 'template.html'
      });
  });

  this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  this.sandbox.restore();
});

describe('Directive : UI Router : Tabs', function() {

  var scope, directive_scope, view, element, state, stub, spy, createView, get_current_state, get_active_tab;
  var $ngView;

  beforeEach(inject(function($rootScope, $state, $templateCache) {

    $templateCache.put('template.html', '');

    createView = function(html, scope) {
      element = angular.element(view);

      inject(function($compile) {
        $ngView = $compile(html)(scope);
      });

      scope.$digest();
      directive_scope = $ngView.isolateScope();

      return $ngView;
    };

    scope = $rootScope.$new();
    state = $state;

    get_current_state = function() {
      return state.current.name;
    };

    get_active_tab = function() {
      return _.findWhere(directive_scope.tabs, {
        active: true
      });
    };

    scope.tabConfiguration = [
      {
        heading: 'Heading 1',
        route: 'menu.route1',
        active: true
      },
      {
        heading: 'Heading 2',
        route: 'menu.route2',
        active: false
      }
    ];

    view = '<tabs data="tabConfiguration" type="pills"></tabs>';
    $ngView = createView(view, scope);
  }));

  // TODO: it should throw a hissy fit if no data tag declared

  it('should define the tabs directive with isolated scope', function() {
    expect(directive_scope).toBeDefined();
  });

  it('should throw an error if no data attribute was specified', function() {
    expect(function() {
      createView('<tabs></tabs>', scope);
    }).toThrow('\'data\' attribute not defined, please check documentation for how to use this directive.');
  });

  it('should initialise the tab configuration correctly when defined', function() {
    expect(scope.tabConfiguration).toBeDefined();
    expect(directive_scope.tabs).toBeDefined();

    expect(scope.tabConfiguration).toEqual(directive_scope.tabs);
    expect(directive_scope.type).toEqual('pills');
  });

  it('should route to the first entry in tabConfiguration array by default', function() {
    expect(get_current_state()).toEqual(scope.tabConfiguration[0].route);
    expect(get_current_state()).toEqual(scope.tabConfiguration[0].route);
  });

  it('it should not change the route when selecting the current tab', function() {

    var previous_state = get_current_state();

    var current_active_tab_index = _.indexOf(scope.tabConfiguration, _.findWhere(scope.tabConfiguration, {
      route: previous_state
    }));

    spy = this.sandbox.spy(state, 'go');

    $ngView.find('a').get(current_active_tab_index).click();
    expect(spy).not.toHaveBeenCalled();
    expect(get_current_state()).toEqual(previous_state);
  });

  it('it should change the route when selecting a different tab', function() {

    var previous_state = get_current_state();

    var non_active_tab = _.findWhere(scope.tabConfiguration, {
      active: false
    });

    var non_active_tab_index = _.indexOf(scope.tabConfiguration, non_active_tab);

    spy = this.sandbox.spy(state, 'go');

    $ngView.find('a').get(non_active_tab_index).click();

    expect(spy).toHaveBeenCalled();
    expect(get_current_state()).not.toEqual(previous_state);
  });
});

'use strict';

beforeEach(function() {

  module('ui.router.tabs');
  module('ui.router');
  module('ui.bootstrap');

  module(function($stateProvider) {
    $stateProvider
      .state('menu', {
        url: '/menu'
      })
      .state('menu.route1', {
        url: '/route1'
      }).state('menu.route2', {
        url: '/route2'
      })
      .state('notabs', {
        url: '/notabs'
      });
  });

  this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  this.sandbox.restore();
});

describe('Directive : UI Router : Tabs', function() {

  var root_scope, isolate_scope, scope, directive_scope, view, element, state, spy, update_tabs_spy;
  var createView, non_active_tab, get_current_state, get_active_tab;
  var $ngView;
  var params = {};
  var options = {};
  var timeout;

  beforeEach(inject(function($rootScope, $state, $templateCache, $timeout) {

    $templateCache.put('template.html', '');

    timeout = $timeout;

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

    root_scope = $rootScope;

    get_current_state = function() {
      return state.current.name;
    };

    non_active_tab = function() {
      return _.findWhere(scope.tabConfiguration, {
        active: false
      });
    };

    get_active_tab = function() {
      return _.findWhere(directive_scope.tabs, {
        active: true
      });
    };

    scope.tabConfiguration = [
      {
        heading: 'Heading 1',
        route: 'menu.route1'
      },
      {
        heading: 'Heading 2',
        route: 'menu.route2',
        params: params,
        options: options
      }
    ];

    view = '<tabs data="tabConfiguration" type="pills"></tabs>';
    $ngView = createView(view, scope);

    isolate_scope = $ngView.isolateScope();
    spy = this.sandbox.spy(state, 'go');
    update_tabs_spy = this.sandbox.spy(isolate_scope, 'update_tabs');
  }));

  it('should define the tabs directive with isolated scope', function() {
    expect(directive_scope).toBeDefined();
  });

  it('should throw an error if no data attribute was specified', function() {
    expect(function() {
      createView('<tabs></tabs>', scope);
    }).toThrow('\'data\' attribute not defined, please check documentation for how to use this directive.');
  });

  it('should throw an error if no data attributes is not an array', function() {
    expect(function() {
      scope.tabConfiguration = {};
      createView('<tabs data="tabConfiguration"></tabs>', scope);
    }).toThrow('\'data\' attribute must be an array of tab data with at least one tab defined.');
  });

  it('should initialise the tab configuration correctly when defined', function() {
    expect(scope.tabConfiguration).toBeDefined();
    expect(directive_scope.tabs).toBeDefined();

    expect(scope.tabConfiguration).toEqual(directive_scope.tabs);
    expect(directive_scope.type).toEqual('pills');
  });

  it('should route to the first entry in tabConfiguration array by default', function() {
    expect(get_current_state()).toEqual(scope.tabConfiguration[0].route);
  });

  it('should not change the route when selecting the current tab', function() {

    var previous_state = get_current_state();

    var current_active_tab_index = _.indexOf(scope.tabConfiguration, _.findWhere(scope.tabConfiguration, {
      route: previous_state
    }));

    $ngView.find('a').eq(current_active_tab_index).click();
    timeout.flush();

    expect(get_current_state()).toEqual(previous_state);
  });

  it('should change the route and update the tabs when selecting a different tab', function() {

    var previous_state = get_current_state();

    var another_tab = non_active_tab();
    var non_active_tab_index = _.indexOf(scope.tabConfiguration, another_tab);

    $ngView.find('a').eq(non_active_tab_index).click();
    timeout.flush();

    expect(spy).toHaveBeenCalledWith(another_tab.route);
    expect(get_current_state()).not.toEqual(previous_state);
    expect(update_tabs_spy).toHaveBeenCalled();
  });

  it('should unbind the stateChangeSuccess event binding once the controller with the tabs is destroyed', function() {
    scope.$destroy();

    var another_tab = 'notabs';
    state.go(another_tab);
    timeout.flush();

    expect(update_tabs_spy).not.toHaveBeenCalled();
  });
});

# UI Router Tabs
Leverages UI Bootstrap and UI Router to give you full-strength route-driven tabs in Angular.js.

[![Build Status](https://secure.travis-ci.org/rpocklin/ui-router-tabs.svg)](http:/travis-ci.org/rpocklin/ui-router-tabs)

## Example

1. Checkout git repository locally.
1. `npm install`
1. `bower install`
1. `grunt serve`
1. View `http://localhost:9000/example/` in your browser.

## How to use

1. Add `ui.router.tabs` as a new module dependency in your angular app.
1. Define your routes in a hierarchy that makes sense for a tabbed layout.
1. Define your `tabData` (or similiar variable) in the root view controller of your tabs.
1. Declare the following in your corresponding HTML view template `<tabs data="tabData" type="tabs" />`.

## UI Router
[Link](https://github.com/angular-ui/ui-router)

## UI Bootstrap - Tabs
[Link](http://angular-ui.github.io/bootstrap/#/tabs)

See configurable options, notably:

- type: [ 'tabs' | 'pills' ]
- vertical: boolean
- justified: boolean

## Tips
You can move the `<tabs>` tag around to wherever you like.  Left-positioned seems best suited for responsive design.

You can update the `tabData` variable dynamically, if you want to.

/*globals $, module, describe, it, expect, beforeEach, inject */
/**
 * @license angular-sortable-column
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        7/21/13
 */

describe('sortable column', function () {
  'use strict';

  beforeEach(module('ui.sortableColumn'));

  // add $routeProvider mock
  beforeEach(module(function ($routeProvider) {
    $routeProvider.when('/test', {
    });
    $routeProvider.when('/test/:id', {
    });
    $routeProvider.otherwise({
      redirectTo: '/foo/'
    });
  }));

  describe('where initial structure', function () {
    it('contains a `<a>` element with href containing route parameters', function () {
      inject(function ($compile, $route, $location, $rootScope) {
        expect($route.current).toBeUndefined();
        $location.path('/test').search('foo', 'bar').search('this', 'that');
        $rootScope.$digest();

        var element = $compile('<th data-sortable-column="{ title: \'Click Me!\', property:\'foo\'}"></th>')($rootScope);
        $rootScope.$digest();

        expect($route.current.template).not.toBeNull();
        expect($route.current.params).not.toBeNull();

        expect($('a', element).attr('data-ng-href')).toContain('foo=bar');
        expect($('a', element).attr('data-ng-href')).toContain('this=that');
      });
    });
    it('can remove unwanted params in config.params', function () {
      inject(function ($compile, $route, $location, $rootScope) {
        expect($route.current).toBeUndefined();
        $location.path('/test/13').search('foo', 'bar').search('this', 'that');
        $rootScope.$digest();

        var element = $compile('<th data-sortable-column="{ title: \'Click Me!\', property:\'foo\', exclude: [ \'id\' ] }"></th>')($rootScope);
        $rootScope.$digest();

        expect($route.current.template).not.toBeNull();
        expect($route.current.params).not.toBeNull();

        expect($('a', element).attr('data-ng-href')).toContain('foo=bar');
        expect($('a', element).attr('data-ng-href')).toContain('this=that');
        expect($('a', element).attr('data-ng-href')).not.toContain('id=13');
      });
    });
    it('sort parameters changes from asc to desc', function () {
      inject(function ($compile, $route, $location, $rootScope) {
        expect($route.current).toBeUndefined();
        $location.path('/test').search('sort', 'foo').search('order', 'asc');
        $rootScope.$digest();

        var element = $compile('<th data-sortable-column="{ title: \'Click Me!\', property:\'foo\'}"></th>')($rootScope);
        $rootScope.$digest();

        expect($route.current.template).not.toBeNull();
        expect($route.current.params).not.toBeNull();

        expect($('a', element).attr('data-ng-href')).toContain('sort=foo');
        expect($('a', element).attr('data-ng-href')).toContain('order=desc');
        expect(element.attr('class')).toContain('sorted');
        expect(element.attr('class')).toContain('asc');
      });
    });
    it('sort parameters changes from desc to asc', function () {
      inject(function ($compile, $route, $location, $rootScope) {
        expect($route.current).toBeUndefined();
        $location.path('/test').search('sort', 'descending').search('order', 'desc');
        $rootScope.$digest();

        var element = $compile('<th data-sortable-column="{ title: \'Click Me!\', property:\'descending\'}"></th>')($rootScope);
        $rootScope.$digest();

        expect($route.current.template).not.toBeNull();
        expect($route.current.params).not.toBeNull();

        expect($('a', element).attr('data-ng-href')).toContain('sort=descending');
        expect($('a', element).attr('data-ng-href')).toContain('order=asc');
        expect(element.attr('class')).toContain('sorted');
        expect(element.attr('class')).toContain('desc');
      });
    });
    it('allows missing sort param', function () {
      inject(function ($compile, $route, $location, $rootScope) {
        expect($route.current).toBeUndefined();
        $location.path('/test').search('order', 'desc');
        $rootScope.$digest();

        var element = $compile('<th data-sortable-column="{ title: \'Click Me!\', property:\'descending\'}"></th>')($rootScope);
        $rootScope.$digest();

        expect($route.current.template).not.toBeNull();
        expect($route.current.params).not.toBeNull();

        expect($('a', element).attr('data-ng-href')).toContain('sort=descending');
        expect($('a', element).attr('data-ng-href')).toContain('order=asc');
      });
    });
    it('allows missing order parameter', function () {
      inject(function ($compile, $route, $location, $rootScope) {
        expect($route.current).toBeUndefined();
        $location.path('/test').search('sort', 'descending');
        $rootScope.$digest();

        var element = $compile('<th data-sortable-column="{ title: \'Click Me!\', property:\'descending\'}"></th>')($rootScope);
        $rootScope.$digest();

        expect($route.current.template).not.toBeNull();
        expect($route.current.params).not.toBeNull();

        expect($('a', element).attr('data-ng-href')).toContain('sort=descending');
        expect($('a', element).attr('data-ng-href')).toContain('order=desc');
      });
    });
    it('allows null configuration parameters', function () {
      inject(function ($compile, $route, $location, $rootScope) {
        expect($route.current).toBeUndefined();
        $location.path('/test').search('sort', 'descending').search('order', 'desc');
        $rootScope.$digest();

        var compile = function () {
          $compile('<th data-sortable-column="{ title: \'Click Me!\', property:\'descending\', params : null}"></th>')($rootScope);
          $rootScope.$digest();
        };
        expect(compile).not.toThrow();
      });
    });
  });
});
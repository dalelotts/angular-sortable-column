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
  var element;
  beforeEach(module('ui.sortableColumn'));

  beforeEach(inject(function ($compile, $rootScope) {
    element = $compile('<th data-sortable-column="{ title: \'Click Me!\', property:\'foo\'}"></th>')($rootScope);
    $rootScope.$digest();
  }));

  describe('where initial structure', function () {
    it('is a `<th>` element', function () {
      expect(element.prop('tagName')).toBe('TH');
    });
    it('contains a `<a>` element', function () {
      expect(element.find('a').length).toBe(1);
    });
    it('contains a `<a>` element', function () {
      expect(element.find('a').text()).toBe('Click Me!');
    });
    it('contains a `<a>` element with href matching property', function () {
      expect($('a', element).attr('data-ng-href')).toContain('sort=foo');
      expect($('a', element).attr('data-ng-href')).toContain('order=asc');
    });
  });
});
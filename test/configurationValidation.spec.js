/*globals $, module, describe, it, expect, beforeEach, inject */

/**
 * @license angular-sortable-column
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        8/22/13
 */

describe('configuration validation', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.sortableColumn'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  describe('does not throw exception', function () {
    it('when params are specified', function () {
      var element = $compile('<th data-sortable-column="{ title: \'foo\', property:\'bar\', params: { this: \'that\', why: \'not\'} }" ></th>')($rootScope);
      $rootScope.$digest();
      expect($('a', element).attr('data-ng-href')).toContain('sort=bar');
      expect($('a', element).attr('data-ng-href')).toContain('order=asc');
      expect($('a', element).attr('data-ng-href')).toContain('this=that');
      expect($('a', element).attr('data-ng-href')).toContain('why=not');
    });
  });

  describe('throws exception', function () {
    it('if configuration is not specified', function () {
      function compile() {
        $compile('<th data-sortable-column ></th>')($rootScope);
      }

      expect(compile).toThrow("configuration object must be specified");
    });
    it('if title is not specified', function () {
      function compile() {
        $compile('<th data-sortable-column="{ property: \'foo\'}" ></th>')($rootScope);
      }

      expect(compile).toThrow("title must be specified");
    });
    it('if title is zero length', function () {
      function compile() {
        $compile('<th data-sortable-column="{ title: \'\', property:\'bar\' }" ></th>')($rootScope);
      }

      expect(compile).toThrow("title must be specified");
    });
    it('if property is not specified', function () {
      function compile() {
        $compile('<th data-sortable-column="{ title: \'foo\'}" ></th>')($rootScope);
      }

      expect(compile).toThrow("property must be specified");
    });
    it('if property is zero length', function () {
      function compile() {
        $compile('<th data-sortable-column="{ title: \'foo\', property:\'\' }" ></th>')($rootScope);
      }

      expect(compile).toThrow("property must be specified");
    });
    it('if defaultOrder must be specified', function () {
      function compile() {
        $compile('<th data-sortable-column="{ title: \'foo\', property:\'bar\', defaultOrder: undefined }" ></th>')($rootScope);
      }

      expect(compile).toThrow("defaultOrder must be specified");
    });
    it('if defaultOrder is zero length', function () {
      function compile() {
        $compile('<th data-sortable-column="{ title: \'foo\', property:\'bar\', defaultOrder: \'\' }" ></th>')($rootScope);
      }

      expect(compile).toThrow("defaultOrder must be specified");
    });
    it('if defaultOrder is not asc or desc', function () {
      function compile() {
        $compile('<th data-sortable-column="{ title: \'foo\', property:\'bar\', defaultOrder: \'other\' }" ></th>')($rootScope);
      }

      expect(compile).toThrow("defaultOrder must be asc or desc");
    });
  });
});


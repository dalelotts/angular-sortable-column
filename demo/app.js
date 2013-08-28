/**
 * @license angular-sortable-column
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *  @author    Dale "Ducky" Lotts
 *  @since    8/27/13
 */

angular.module('ui.sortableColumn.demo', ['ui.sortableColumn'])
  .config(['$routeProvider', function ($routeProvider) {
    "use strict";
    $routeProvider
      .when('/test', { template : '<table><thead><th data-sortable-column="{ title: \'Link Title\', property: \'foo\' }"  data-ng-class="{ sorted: sorted, asc: ordered == \'asc\', desc : ordered == \'desc\' }"></th></thead></table>', controller: function () {} })
      .when('/test/:id', {  })
      .otherwise({
        redirectTo: '/'
      });
  }]);
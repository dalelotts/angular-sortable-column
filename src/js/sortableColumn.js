/*globals angular, moment, jQuery */
/*jslint vars:true */

/**
 * @license angular-sortable-column  v0.1.2
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        2013-Jul-8
 */

angular.module('ui.sortableColumn', [])
  .constant('sortableColumnConfig', {
    defaultOrder: 'asc', // default order for the property; choose between asc (default if not provided) and desc
    exclude: [], // Any parameters that should be excluded from parameters list generated from route params.
    params: {},
    prefix: '#',
    property: undefined, // name of the property relating to the column to sort
    title: undefined // title caption for the column (text of the link)
  })
  .constant('sortableColumnConfigValidation', function (configuration) {
    "use strict";
    if (!configuration.title) {
      throw ("title must be specified");
    }
    if (!configuration.property) {
      throw ("property must be specified");
    }
    if (!configuration.defaultOrder) {
      throw ("defaultOrder must be specified");
    }
    if (configuration.defaultOrder !== 'asc' && configuration.defaultOrder !== 'desc') {
      throw ("defaultOrder must be asc or desc");
    }
  })
  .directive('sortableColumn', [ '$route', '$location', '$timeout', 'sortableColumnConfig', 'sortableColumnConfigValidation', function ($route, $location, $timeout, defaultConfig, validateConfigurationFunction) {
    "use strict";

    return {
      restrict: 'A',
      scope: true,
      template: "<a data-ng-href='{{ href }}' >{{ title }}</a>",
      link: function (scope, element, attrs) {

        if (!attrs.sortableColumn) {
          throw ("configuration object must be specified");
        }

        var directiveConfig = scope.$eval(attrs.sortableColumn);

        var configuration = angular.extend({}, defaultConfig, directiveConfig);

        validateConfigurationFunction(configuration);

        var params = angular.extend({}, configuration.params || {});

        params.sort = configuration.property;
        params.order = configuration.defaultOrder;

        if ($route.current) {
          //  Make a copy of the current route params because we don't want to modify it.
          var routeParams = angular.extend({}, $route.current.params);

          // Exclude any properties from the route params
          angular.forEach(configuration.exclude, function (value) {
            delete routeParams[value];
          });

          params = angular.extend(params, routeParams);

          scope.ordered = $route.current.params.order || configuration.defaultOrder;
          scope.sorted = (configuration.property === $route.current.params.sort);

          if (scope.sorted) {
            scope.ordered = ($route.current.params.order || configuration.defaultOrder);
            var ascending = (scope.ordered === "asc");
            // toggle sort order
            params.order = ascending ? "desc" : "asc";
          } else {
            // Sort and order could have been over-written by route params, so reset them
            params.sort = configuration.property;
            params.order = configuration.defaultOrder;
          }
        }

        var parameters = "?" + jQuery.param(params);

        scope.href = configuration.prefix + $location.path() + parameters;
        scope.title = configuration.title;

        element.removeClass('sorted');
        element.removeClass('asc');
        element.removeClass('desc');

        if (scope.sorted) {
          element.addClass('sorted');
          element.addClass(scope.ordered);
        }
      }
    };
  }]);

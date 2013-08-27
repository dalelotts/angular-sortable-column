# Angular sortable column
================================

Native AngularJS sortable column directive that is modeled after the [Grails sortableColumn tag] (http://grails.org/doc/latest/ref/Tags/sortableColumn.html)

[![Build Status](https://travis-ci.org/dalelotts/angular-sortable-column.png?branch=master)](https://travis-ci.org/dalelotts/angular-sortable-column)

#Dependencies

Requires:
 * AngularJS 1.1.3 or higher (Not tested with 1.0.x)
 * jQuery 1.10.2 or higher (Would like to remove this dependency)

#Testing
We use karma and jshint to ensure the quality of the code. The easiest way to run these checks is to use grunt:

```
npm install -g grunt-cli
npm install bower grunt
```

The karma task will try to open Chrome as a browser in which to run the tests. Make sure this is available or change the configuration in test\test.config.js

#Usage
We use bower for dependency management. Add

```json
dependencies: {
    "angular-sortable-column": "latest"
}
```

To your bower.json file. Then run

```html
bower install
```

This will copy the angular-sortable-column files into your components folder, along with its dependencies.

Load the script files in your application:
```html
<script type="text/javascript" src="components/angular/angular.js"></script>
<script type="text/javascript" src="components/angular-sortable-column/src/js/sortableColumn.js"></script>
```

Add the date module as a dependency to your application module:

```html
var myAppModule = angular.module('MyApp', ['ui.sortableColumn'])
```

Apply the directive to your form elements:

```html
<th data-sortable-column="{ title : 'Click Me', property: 'id' }"></th>
```

## Options

### defaultOrder

String.
Required
Default: 'asc'

The default sort order for the column.

Accepts values of :
 * 'asc' for ascending order
 * 'desc' for descending order

### exclude

String array.
Optional
Default: []

Array of route parameters that should be excluded from the link paramaters.
This is useful when using parametrized routes. i.e. .when( '/customer/:id' ... ) exclude 'id' so id=x is not one of the url paramters.

### params
Object.
Optional
default: {}

An object containing additional request parameters.

### prefix

String.
Optional
default: '#'

Prefix the generated url with this value.

### property

String.
Required
default: undefined

Name of the property relating to the column to sort

### title

String.
Required
default: undefined

The title caption for the column.

## Examples

```html
<th data-sortable-column="{ title: 'foo', property: 'bar' }" ></th>
```

will result in an initial value of

```html
<th >
	<a href="#/[$location.path()]?sort=bar&order=asc">foo</a>
</th>
```

However, if the route is '#/[$location.path()]?sort=bar&order=asc'

```html
<th class="sorted asc" >
	<a href="#/[$location.path()]?sort=bar&order=desc">foo</a>
</th>
```
Note that the order in the link is different than the current order
and that the 'sorted' and 'asc' classes were added to the 'th' element
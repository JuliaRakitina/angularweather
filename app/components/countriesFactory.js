/**
 * Created by julia on 10/8/16.
 */
'use strict';
app.factory('CountriesFactory', function($resource) {
    return $resource(
        'data/countries.json',null,
        { method: 'getCountry', q: '*' }, // Query parameters
        {'query': { method: 'GET' , isArray: false}}
    );
});
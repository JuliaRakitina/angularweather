/**
 * Created by julia on 10/6/16.
 */
'use strict';

app.service("Geolocation", ["$q", "$window", "$timeout", function ($q, $window, $timeout) {
    this.getLocation = function (timeoutVal) {
        var deferred = $q.defer(),
            n = $window.navigator,
            timeoutVal = timeoutVal || 10000,
            options = {timeout: timeoutVal};

        // Custom error objects
        var notSupportedError = {
            code: 4,
            NOT_SUPPORTED: 4,
            message: 'Your device does not support Geolocation.'
        };

        // Check if geolocation is supported
        if (n.geolocation) {
            n.geolocation.getCurrentPosition(positionSuccess, positionError, options);
        } else {
            deferred.reject(notSupportedError);
        }

        function positionSuccess(position) {
            // resolve the promise with the position object
            deferred.resolve(position);
        }

        function positionError(error) {
            // reject the promise with the error object provided by the Geolocation API
            deferred.reject(error);
        }

        return deferred.promise;
    };
}]);
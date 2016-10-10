'use strict';

app.controller('HomeCtl', ["$scope", "Geolocation", "openweathermapFactory", "CountriesFactory", function ($scope, Geolocation, openweathermapFactory, CountriesFactory) {
    $scope.date = new Date();
    $scope.isSettingsOpened = false;
    $scope.isWeatherAvailable = false;
    $scope.isInProgress = true;
    $scope.address = {
        name: '',
        place: '',
        components: {
            placeId: '',
            streetNumber: '',
            street: '',
            city: '',
            state: '',
            countryCode: '',
            country: '',
            postCode: '',
            district: '',
            location: {
                lat: '',
                long: ''
            }
        }
    };
    $scope.myPlace = '';
    $scope.myWeather = {};
    $scope.activated = true;
    CountriesFactory.query(function (response) {
        $scope.states = response;
    });

    Geolocation.getLocation().then(function (position) {
        $scope.position = position;
        $scope.locationError = null;
        openweathermapFactory.getWeatherFromLocationByCoordinates({
            lat: $scope.position.coords.latitude,
            lon: $scope.position.coords.longitude,
            lang: "en", // (optional) http://openweathermap.org/current#multi
            units: "metric", // (optinal) http://openweathermap.org/current#data
            appid: "7d2c1e59a1d115355be10c22a2e71f9b"
        }).then(function (_data) {
            $scope.myPlace = _data.data.name;
            $scope.myWeather = _data.data;
            $scope.isWeatherAvailable = true;
            $scope.isInProgress = false;
        }).catch(function (_data) {
            console.info(_data)
        });
    }, function (error) {
        $scope.locationError = error;
        $scope.isSettingsOpened = true;
        $scope.isInProgress = false;

    });

    $scope.clearAddress = function () {
        $scope.address = {
            name: '',
            place: '',
            components: {
                placeId: '',
                streetNumber: '',
                street: '',
                city: '',
                state: '',
                countryCode: '',
                country: '',
                postCode: '',
                district: '',
                location: {
                    lat: '',
                    long: ''
                }
            }
        };
    };
    $scope.showWeather = function () {
        $scope.isInProgress = true;
        if ($scope.address.components.city != '' && $scope.address.components.postCode == '') {//if we get only city name
            openweathermapFactory.getWeatherFromCitySearchByName({
                q: $scope.address.components.city + "," + $scope.address.components.countryCode.toLowerCase(), //city name and country code divided by comma, use ISO 3166 country codes eg "London,uk"
                lang: "en", // (optional) http://openweathermap.org/current#multi
                units: "metric", // (optinal) http://openweathermap.org/current#data
                appid: "7d2c1e59a1d115355be10c22a2e71f9b"
            }).then(function (_data) {
                $scope.myPlace = _data.data.name;
                $scope.myWeather = _data.data;
                $scope.isSettingsOpened = false;
                $scope.isWeatherAvailable = true;
                $scope.isInProgress = false;
            }).catch(function (_data) {
                console.info(_data)
            });
        }
        else if ($scope.address.components.city == '' && $scope.address.components.postCode != '') {//if we get only post code
            openweathermapFactory.getWeatherFromLocationByZipcode({
                zip: $scope.address.components.postCode + "," + $scope.address.components.countryCode.toLowerCase(),
                lang: "en", // (optional) http://openweathermap.org/current#multi
                units: "metric", // (optinal) http://openweathermap.org/current#data
                appid: "7d2c1e59a1d115355be10c22a2e71f9b"
            }).then(function (_data) {
                $scope.myPlace = _data.data.name;
                $scope.myWeather = _data.data;
                $scope.isSettingsOpened = false;
                $scope.isWeatherAvailable = true;
                $scope.isInProgress = false;
            }).catch(function (_data) {
                console.info(_data)
            });
        }
        else {
            openweathermapFactory.getWeatherFromCitySearchByName({//if we get city name and postcode default version
                q: $scope.address.components.city + "," + $scope.address.components.countryCode.toLowerCase(),
                lang: "en", // (optional) http://openweathermap.org/current#multi
                units: "metric", // (optinal) http://openweathermap.org/current#data
                appid: "7d2c1e59a1d115355be10c22a2e71f9b"
            }).then(function (_data) {
                $scope.myPlace = _data.data.name;
                $scope.myWeather = _data.data;
                $scope.isSettingsOpened = false;
                $scope.isWeatherAvailable = true;
                $scope.isInProgress = false;
            }).catch(function (_data) {
                console.info(_data)
            });
        }


    };

}]);
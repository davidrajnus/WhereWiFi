angular.module('wherewifiApp', []);

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
    if (distance && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance * 1000,10);
        unit = 'm';
      }
      return numDistance + unit;
    } else {
      return "?";
    }
  };
};

var locationListCtrl = function ($scope, wherewifiData, geolocation) {
  $scope.message = "Checking your location";

  $scope.getData = function (position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    $scope.message = "Searching for nearby places";

    wherewifiData.locationByCoords(lat,lng)
      .then(function successCallback(data) {
        $scope.message = data.length > 0 ? "" : "No locations found";
        $scope.data = { locations: data };
    }, function errorCallback(e) {
        $scope.message = "Sorry, something's gone wrong";
      });
  };

  $scope.showError = function (error) {
    $scope.$apply(function () {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function () {
    $scope.$apply(function () {
      $scope.message = "Geolocation not supported by this browser";
    });
  };

  geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
};

var wherewifiData = function ($http) {
  var locationByCoords = function (lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
  };
  return {
    locationByCoords : locationByCoords
  };
};

var geolocation = function () {
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    }
    else {
      cbNoGeo();
    }
  };
  return {
    getPosition : getPosition
  };
};

var ratingStars = function () {
  return {
    scope: {
      thisRating : '=rating'
    },
    templateUrl : '/angular/rating-stars.html'
  };
};

angular
  .module('wherewifiApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('wherewifiData', wherewifiData)
  .service('geolocation', geolocation);
(function () {
  angular
    .module('wherewifiApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];
  function homeCtrl ($scope, wherewifiData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: 'WhereWiFi',
      strapline: 'Find places to work with WiFi!'
    };
    vm.sidebar = {
      content: "Looking for WiFi and a seat and a good drink!"
    };

    vm.message = "Checking your location";

    vm.getData = function (position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      vm.message = "Searching for nearby places";

      wherewifiData.locationByCoords(lat,lng)
        .then(function successCallback(data) {
          vm.message = data.length > 0 ? "" : "No locations found";
          vm.data = { locations: data };
      }, function errorCallback(e) {
          vm.message = "Sorry, something's gone wrong";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function () {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function () {
        vm.message = "Geolocation not supported by this browser";
      });
    };

    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
  }
})();

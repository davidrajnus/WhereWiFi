(function () {

angular.module('wherewifiApp', ['ngRoute']);

function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
}

angular
  .module('wherewifiApp')
  .config(['$routeProvider', config]);

})();
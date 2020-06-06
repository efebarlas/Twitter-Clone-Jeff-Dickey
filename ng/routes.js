angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {controller: 'PostsCtrl', templateUrl: 'posts.html'})
    .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html'})
    .when('/login', {controller: 'LoginCtrl', templateUrl: 'login.html' });
    $locationProvider.html5Mode(true);
}]);
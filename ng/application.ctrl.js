angular.module('app').controller('ApplicationCtrl', function($window, $scope, $location, UserSvc) {
    if ($window.localStorage.token != 'null') {
        console.log(typeof $window.localStorage.token);
        console.log($window.localStorage.token);
        console.log('a');
        UserSvc.getUser().then(function(user) {$scope.currentUser = user});
    }
    $scope.$on('login', function(_, user) {
        $scope.currentUser = user;
        $location.path('/');
    });
    $scope.logout = function() {
        $window.localStorage.token = null;
        $scope.currentUser = null;
        UserSvc.logout();
    } 
});
angular.module('app', [
    'ngRoute'
]);
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
angular.module('app')
.controller('LoginCtrl', function ($scope, UserSvc) {
    $scope.login = function(username, password) {
        UserSvc.login(username, password)
        .then(function(user) {
            $scope.$emit('login', user);
        });
    };
})
angular.module('app').controller('PostsCtrl', ['$scope', 'PostsSvc', function ($scope, PostsSvc) {
    $scope.addPost = function() {
        if ($scope.postBody) {
            PostsSvc.create({
                username: $scope.currentUser,
                body: $scope.postBody
            }).success(function (post) {
                $scope.posts.unshift(post)
                $scope.postBody = null
            })
        }
    }
    PostsSvc.fetch().success(function(posts) {
        $scope.posts = posts;
    });
}]);
angular.module('app').service('PostsSvc', function ($http) {
    this.fetch = function() {
        return $http.get('/api/posts');
    }

    this.create = function(post) {
        return $http.post('/api/posts', post);
    }
})


angular.module('app')
.controller('RegisterCtrl', function ($scope, UserSvc) {
  $scope.register = function (username, password) {
    UserSvc.register(username, password)
    .then(function (user) {
      $scope.$emit('login', user)
    })
  }
})
angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {controller: 'PostsCtrl', templateUrl: 'posts.html'})
    .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html'})
    .when('/login', {controller: 'LoginCtrl', templateUrl: 'login.html' });
    $locationProvider.html5Mode(true);
}]);

angular.module('app')
.service('UserSvc', function ($http, $window) {
  var svc = this
  svc.getUser = function () {
    if ($window.localStorage.token) {
        $http.defaults.headers.common['X-Auth'] = $window.localStorage.token;
    }
    return $http.get('/api/users')
    .then(function (response) {
      return response.data
    })
  }
  svc.login = function (username, password) {
    return $http.post('/api/sessions', {
      username: username, password: password
    }).then(function (response) {
      $window.localStorage.token = response.data
      $http.defaults.headers.common['X-Auth'] = response.data
      return svc.getUser()
    })
  }
  svc.register = function (username, password) {
    return $http.post('/api/users', {
      username: username, password: password
    }).then(function () {
      return svc.login(username, password)
    })
  }
  svc.logout = function () {
    $http.defaults.headers.common['X-Auth'] = undefined
    }
})
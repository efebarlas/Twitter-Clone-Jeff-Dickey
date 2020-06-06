
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
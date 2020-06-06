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
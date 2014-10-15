angular.module('redditClientApp', [])
  .controller('RedditCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.submitSubReddit = function() {
      $http.get(/r/ + $scope.subReddit + '/hot')
        .success(function(data, status) {
          $scope.subRedditHot = data.children;
          $scope.subRedditSubmitted = true; // Set to true after successful request.
          $scope.selectHot();
        });
      $http.get(/r/ + $scope.subReddit + '/new')
        .success(function(data, status) {
          $scope.subRedditNew = data.children;
          $scope.subRedditSubmitted = true;
        });
    };

    $scope.selectNew = function() {
      if ($scope.page != 'new') {
        $scope.headlines = $scope.subRedditNew;
        $scope.page = 'new';
      }
    };

    $scope.selectHot = function() {
      if ($scope.page != 'hot') {
        $scope.headlines = $scope.subRedditHot;
        $scope.page = 'hot';
      }
    };

    $scope.morePages = function() {
      // Use last reddit post as index for new posts.
      var requestOptions = {
        params: {
          after: $scope.headlines[$scope.headlines.length - 1].data.name
        }
      };
      $http.get('/r/' + $scope.subReddit + '/' + $scope.page, requestOptions)
        .success(function(data, status) {
          if ($scope.page == 'hot') {
            $scope.subRedditHot = $scope.subRedditHot.concat(data.children);
            $scope.headlines = $scope.subRedditHot;
          } else {
            $scope.subRedditNew = $scope.subRedditNew.concat(data.children);
            $scope.headlines = $scope.subRedditNew;
          }
          $scope.lastNewPost = data.after;
        });
    };
  }]);
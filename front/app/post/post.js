(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root.post', {
        url: '/post/:id',
        views: {
          '@': {
            templateUrl: 'app/post/post.tpl.html',
            controller: 'PostCtrl as post',
            resolve: {
              data: function(DataService,$stateParams){
                return DataService.get('http://localhost:3000/api/post/'+$stateParams.id);
              }
            }
          }
        }
      });
  }

  function PostCtrl(data,$scope,$sce,$http) {
    /*jshint validthis:true */
    var post = this;
    this.data = data.data;
    post = data.data;
    

    $scope.init = function(){
      var query = {
        method: 'GET',
        url: 'http://localhost:3000/api/user/'+post.author
      
       }
       

      $http(query).then(function(res){

        $scope.user = res.data;
      });
    };
    $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }
    
  }

  angular.module('post', [])
    .config(config)
    .controller('PostCtrl', PostCtrl);
})();

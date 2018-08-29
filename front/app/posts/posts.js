(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root.posts', {
        url: '/posts',
        views: {
          '@': {
            templateUrl: 'app/posts/posts.tpl.html',
            controller: 'PostsCtrl as posts',
            resolve: {
              data: function(DataService){
                return DataService.get('http://localhost:3000/api/post');
              }
            }
          }
        }
      });
  }

  function PostsCtrl(data,$scope) {
    /*jshint validthis:true */
    var posts = this;
    this.data = data.data;
    posts = data.data;
  }

  angular.module('posts', [])
    .config(config)
    .controller('PostsCtrl', PostsCtrl);
})();

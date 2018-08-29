(function() {
  'use strict';/*
  function postLogin(data){
    dataService.post("http://localhost:3000/api/signin",data);
  };*/
  function headerCtrl($log,$scope,$http,$rootScope) {
    $scope.log=false;
    $scope.token = "";
    var init = function(){

      
      
      $scope.token = sessionStorage.getItem('token');
      // verify token 
      if($scope.token != null){
        var query = {
          method: 'GET',
          url: 'http://localhost:3000/api/isauth',
          headers: {
            "Authorization": $scope.token
          }
         }
        $http(query).then(function(res){
            query.url = 'http://localhost:3000/api/user/'+res.data.payload;
          
          $http(query).then(function(resUser){
            resUser.data.password = "";
            var islogin = {
              value: true,
              user: resUser.data,
              token: $scope.token,
              profilepic: resUser.profilepic
            }
            $rootScope.$broadcast('islogin', islogin);
            $rootScope.islogin = islogin;
          });/**/
        });
      }else{
        var islogin = {
          value: false,
          msg: "Not auth" 
        }
        $rootScope.$broadcast('islogin', islogin);
        $rootScope.islogin = islogin;
      }

    };
    $log.debug('Header loaded');
    $scope.user;
    $scope.username = "";
    $scope.password = "";

    $scope.login = function(){
      var newUser = {
        username: $scope.username,
        password: $scope.password
      };
      $http.post("http://localhost:3000/api/signin",newUser).then(function(res,err){
        if(res.data.success){
          sessionStorage.setItem('token', res.data.token);
          $scope.user = {
            username: $scope.username,
            userId: res.data._id
          };
          sessionStorage.setItem('user', $scope.user);
          location.reload();
        }

      });
    };

    $scope.logout = function(){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      location.reload();
    };

    init();

  }

  angular.module('header', [])
    .controller('HeaderCtrl', headerCtrl);
})();

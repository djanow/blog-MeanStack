(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root.signin', {
        url: '/signin',
        views: {
          '@': {
            templateUrl: 'app/log/log.tpl.html',
            controller: 'LogCtrl as log',
            resolve: {
              users: function(DataService){
                return DataService.get('http://localhost:3000/api/getuser');
              }
            }
          }
        }
      });
  }

  function LogCtrl($log, $scope, users, DataService) {
    /*jshint validthis:true */
    
    var log = this;
    log.data = {};
    log.data.users = [];

    users.data.forEach(function(user){
      log.data.users.push(user.username);            
    });
    
    log.submit = function() {
      if ($scope.form.$valid) {
        
        var newUser = {
          username : log.data.email,
          password : log.data.password,
          profilepic: $scope.croppedDataUrl
        }
        DataService.post("http://localhost:3000/api/signup",newUser).then(function(res){
          if(!res.data.success)
            alert(res.data.msg);
          else
            alert(res.data.msg);
        });
      } else {
        $log.error('invalid');
      }
    };

    log.login = function(){

    };
  }

  angular.module('log', [])
    .config(config)
    .controller('LogCtrl', LogCtrl);
})();

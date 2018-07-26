(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'app/common/header.tpl.html',
            controller: 'HeaderCtrl'
          }
        }
      })
      .state('root.home', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'app/home/home.tpl.html',
            controller: 'HomeCtrl as home',
            resolve: {/*
              data: function(DataService){
                return DataService.get('data.json');
              }
              sendMessage: function(data){
                return DataService.post('http://localhost:3000/messages',data);
              },
              getMessage: function(DataService){
                return DataService.get('http://localhost:3000/messages');
              }*/
            }
          }
        }
      });
  }

  function homeCtrl(DataService) {
    /*jshint validthis:true */
    var home = this;
    this.DataService = DataService;
    home.form ={};

    home.send = function(){
      var result;
      home.form.date = Date();
      home.form.subject = 'Candidature';
      if(typeof home.form.phone == 'undefined')
        home.form.phone = 0;
      result = DataService.post('http://localhost:3000/messages',home.form);
      result.then(function(tmp) { 
        if(tmp.status<210 && tmp.status>=200){
          home.form={};
          alert("Message Send");
        }else{
          alert("error status: "+result.status);
        }
      });
      console.log(result);
      home.form={};
      alert("Message Send");
    }


  }

  angular.module('home', [])
    .config(config)
    .controller('HomeCtrl', homeCtrl);
})();

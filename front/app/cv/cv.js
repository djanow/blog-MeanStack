(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root.cv', {
        url: '/cv',
        views: {
          '@': {
            templateUrl: 'app/cv/cv.tpl.html',
            controller: 'CvCtrl as cv',
            resolve: {
              data: function(DataService){
                return DataService.get('data.json');
              }
            }
          }
        }
      });
  }

  function CvCtrl(data) {
    /*jshint validthis:true */
    var cv = this;
    this.data = data.data;
  }

  angular.module('cv', [])
    .config(config)
    .controller('CvCtrl', CvCtrl);
})();

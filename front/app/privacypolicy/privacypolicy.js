(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root.privacypolicy', {
        url: '/privacypolicy',
        views: {
          '@': {
            templateUrl: 'app/privacypolicy/privacypolicy.tpl.html',
            controller: 'PrivacyPolicyCtrl as privacypolicy',
            resolve: {
              data: function(DataService){
                return DataService.get('data.json');
              }
            }
          }
        }
      });
  }

  function PrivacyPolicyCtrl(data) {
    /*jshint validthis:true */
    var privacypolicy = this;
    this.data = data.data;
  }

  angular.module('privacypolicy', [])
    .config(config)
    .controller('PrivacyPolicyCtrl', PrivacyPolicyCtrl);
})();

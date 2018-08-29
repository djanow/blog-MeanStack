(function() {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config($stateProvider, $urlRouterProvider, $logProvider, $httpProvider, DataServiceProvider) {
    //force to use localstorage, this is useful for switch implementation of the same service.
    DataServiceProvider.forceLocalStorage(false);
    $urlRouterProvider.otherwise('/');
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('httpInterceptor');
  }

  function run($log) {
    $log.debug('App is running!');
  }

  angular.module('app', [
      'ngMessages',
      'ui.router',
      'ui.bootstrap',
      
      'home',
      'miscellanoeous',
      'header',
      'services.data',
      'services.utils',
      'services.modal',
      'services.enventBus',
      'interceptors.http',
      'directives.version',
      'directives.uniqueEmailValidator',
      'directives.percentage',
      'directives.rating',
      'directives.footer',
      'filters.uppercase',
      'filters.dateFilter',
      'cv',
      'privacypolicy',
      'posts',
      'post',
      'log',
      'cPost',
      'chart',
      'ngFileUpload', 
      'ngImgCrop',
      'ui.tinymce'
      
    ])
    .config(config)
    .run(run)
    .value('version', '0.0.1');
})();

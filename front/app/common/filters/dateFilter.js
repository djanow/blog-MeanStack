(function() {
  'use strict';

  function dateFilter() {
    return function(text) {
      var dateTmp = new Date(text);
      dateTmp = dateTmp.toLocaleDateString();
      return dateTmp;
    };
  }

  angular.module('filters.dateFilter', [])
    .filter('dateFilter', dateFilter);
})();

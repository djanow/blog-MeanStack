(function() {
  'use strict';

  function uniqueEmailValidatorDirective() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        //not used in this example
        var apiUrl = attrs.uniqueEmailValidator;

        function setAsLoading(bool) {
          ngModel.$setValidity('recordLoading', !bool);
        }

        function setAsAvailable(bool) {
          ngModel.$setValidity('recordAvailable', bool);
        }

        ngModel.$parsers.push(function(value) {
          if (!value || value.length === 0) {
            return;
          }

          setAsLoading(true);
          setAsAvailable(false);
          var tmp = JSON.parse(apiUrl);
          tmp.forEach(function(elem) {
            
          //in real world you should call server here
          if (value === elem) {
            setAsLoading(false);
            setAsAvailable(false);
          } else {
            setAsLoading(false);
            setAsAvailable(true);

            return value;
          }
          });

          return value;
        });
      }
    };
  }

  angular.module('directives.uniqueEmailValidator', [])
    .directive('uniqueEmailValidator', uniqueEmailValidatorDirective);
})();

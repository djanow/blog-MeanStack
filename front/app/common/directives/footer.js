/*
inspired by http://www.befundoo.com/university/tutorials/angularjs-directives-tutorial/
*/
(function() {
  'use strict';

  function footerDirective() {
    return {
      restrict: 'A',
      template: [`
      <!-- Footer -->
      <footer class="footer bg-light">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 h-100 text-center text-lg-left my-auto">
              <ul class="list-inline mb-2">
                <li class="list-inline-item">
                  <a href="#">Home</a>
                </li>
                <li class="list-inline-item">&sdot;</li>
                <li class="list-inline-item">
                  <a ui-sref="root.cv">About Me</a>
                </li>
                <li class="list-inline-item">&sdot;</li>
                <li class="list-inline-item">
                  <a ui-sref="root.privacypolicy">Privacy Policy</a>
                </li>
              </ul>
              <p class="text-muted small mb-4 mb-lg-0">&copy; djanow 2018. All Rights Reserved to djanox.</p>
            </div>
            <div class="col-lg-6 h-100 text-center text-lg-right my-auto">
              <ul class="list-inline mb-0">
                <li class="list-inline-item mr-3">
                  <a href="https://www.facebook.com/jean.moreau" target="_blank">
                    <i class="fa fa-facebook fa-2x fa-fw"></i>
                  </a>
                </li>
                <li class="list-inline-item mr-3">
                  <a href="https://www.linkedin.com/in/jean-moreau-54bb8766" target="_blank">
                    <i class="fa fa-linkedin fa-2x fa-fw"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="https://www.instagram.com/jean.moreau7" target="_blank">
                    <i class="fa fa-instagram fa-2x fa-fw"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      `
      ].join(''),
      scope: {
        
      },
      link: function(scope, elem, attrs) {
        var footerMethod = function() {
        };
      }
    };
  }

  angular.module('directives.footer', [])
    .directive('footer', footerDirective);
})();

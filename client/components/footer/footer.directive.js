/* footer.directive.js */
(function() {

  'use strict';

  /**
   * footerDirective
   * 
   * @description The footer directive is used for displaying the footer on all
   *   pages.
   * @return {Object} The directive
   */
  angular
    .module('app')
    .directive('footerDirective', footerDirective);

  function footerDirective() {
    var directive = {
      restrict: 'E',
      scope: {
        footer: '='
      },
      templateUrl: 'components/footer/footer.directive.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      
    }
  }

})();
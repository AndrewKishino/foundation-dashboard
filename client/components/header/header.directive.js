/* header.directive.js */
(function() {

  'use strict';

  /**
   * headerDirective
   * 
   * @description The header directive is used for displaying the header with
   * dynamic navigation links, depending on user auth state.
   * @return {Object} The directive
   */
  angular
    .module('app')
    .directive('headerDirective', headerDirective);

  function headerDirective() {
    var directive = {
      restrict: 'E',
      scope: {
        header: '='
      },
      templateUrl: 'components/header/header.directive.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      
    }
  }

})();
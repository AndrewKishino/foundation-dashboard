/* sidebar.directive.js */
(function() {

  'use strict';

  /**
   * sidebarDirective
   * 
   * @description The sidebar directive is used for displaying the sidebar with
   * dynamic navigation links, depending on user auth state.
   * @return {Object} The directive
   */
  angular
    .module('app')
    .directive('sidebarDirective', sidebarDirective);

  function sidebarDirective() {
    var directive = {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/sidebar/sidebar.directive.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {

    }
  }

})();
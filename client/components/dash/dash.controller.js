/* dash.controller.js */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('DashController', DashController);

  /**
   * DashController
   *
   * @description Contains all the functionality for the DashController. Returns
   *   nothing.
   */
  function DashController($state) {
    var vm = this;

    $(function() {
      init();
    });

    function init() {
      var mainContent = $('.main-content'),
        header = $('.main-header'),
        sidebar = $('.side-nav'),
        sidebarTrigger = $('.nav-trigger'),
        topNavigation = $('.top-nav'),
        searchForm = $('.search'),
        accountInfo = $('.account');

      //on resize, move search and top nav position according to window width
      var resizing = false;
      moveNavigation();

      $(window).on('resize', function(){
        if( !resizing ) {
          (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
          resizing = true;
        }
      });

      //on window scrolling - fix sidebar nav
      var scrolling = false;
      checkScrollbarPosition();

      $(window).on('scroll', function(){
        if( !scrolling ) {
          (!window.requestAnimationFrame) ? setTimeout(checkScrollbarPosition, 300) : window.requestAnimationFrame(checkScrollbarPosition);
          scrolling = true;
        }
      });

      //mobile only - open sidebar when user clicks the hamburger menu
      sidebarTrigger.on('click', function(event){
        event.preventDefault();
        $([sidebar, sidebarTrigger]).toggleClass('nav-is-visible');
      });

      //click on item and show submenu
      $('.has-children > a').on('click', function(event){
        var mq = checkMQ(),
          selectedItem = $(this);
        if( mq == 'mobile' ) {
          event.preventDefault();
          if( selectedItem.parent('li').hasClass('active')) {
            selectedItem.parent('li').removeClass('active');
          } else {
            sidebar.find('.has-children.active').removeClass('active');
            accountInfo.removeClass('active');
            selectedItem.parent('li').addClass('active');
          }
        } else if( mq == 'tablet' ) {
          event.preventDefault();
          if( selectedItem.parent('li').hasClass('active')) {
            // selectedItem.parent('li').removeClass('active');
          } else {
            sidebar.find('.has-children.active').removeClass('active');
            accountInfo.removeClass('active');
            selectedItem.parent('li').addClass('active');
          }
        } else {
          event.preventDefault();
          if( !selectedItem.parent('li').hasClass('active')) {
            sidebar.find('.has-children.active').removeClass('active');
            accountInfo.removeClass('active');
            selectedItem.parent('li').addClass('active');
          }
        }
      });

      //click on account and show submenu - desktop version only
      accountInfo.children('a').on('click', function(event){
        var mq = checkMQ(),
          selectedItem = $(this);
        if( mq == 'desktop') {
          event.preventDefault();
          accountInfo.toggleClass('active');
          sidebar.find('.has-children.active').removeClass('active');
        }
      });

      // $(document).on('click', function(event){
      //   if( !$(event.target).is('.has-children a') ) {
      //     sidebar.find('.has-children.active').removeClass('active');
      //     accountInfo.removeClass('active');
      //   }
      // });

      //on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
      sidebar.children('ul').menuAim({
        activate: function(row) {
          $(row).addClass('hover');
        },
        deactivate: function(row) {
          $(row).removeClass('hover');
        },
        exitMenu: function() {
          sidebar.find('.hover').removeClass('hover');
          return true;
        },
        submenuSelector: ".has-children"
      });

      function checkMQ() {
        //check if mobile or desktop device
        return window.getComputedStyle(document.querySelector('.main-content'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
      }

      function moveNavigation(){
        var mq = checkMQ();
            
        if ( mq == 'mobile' && topNavigation.parents('.side-nav').length === 0 ) {
          detachElements();
          topNavigation.appendTo(sidebar);
          searchForm.removeClass('is-hidden').prependTo(sidebar);
        } else if ( ( mq == 'tablet' || mq == 'desktop') &&  topNavigation.parents('.side-nav').length > 0 ) {
          detachElements();
          searchForm.insertAfter(header.find('.logo'));
          topNavigation.appendTo(header.find('.nav'));
        }
        checkSelected(mq);
        resizing = false;
      }

      function detachElements() {
        topNavigation.detach();
        searchForm.detach();
      }

      function checkSelected(mq) {
        //on desktop, remove selected class from items selected on mobile/tablet version
        if( mq == 'mobile' ) $('.has-children.active').removeClass('active');
      }

      function checkScrollbarPosition() {
        var mq = checkMQ();
        
        if( mq != 'mobile' ) {
          var sidebarHeight = sidebar.outerHeight(),
            windowHeight = $(window).height(),
            mainContentHeight = mainContent.outerHeight(),
            scrollTop = $(window).scrollTop();

          ( ( scrollTop + windowHeight > sidebarHeight ) && ( mainContentHeight - sidebarHeight !== 0 ) ) ? sidebar.addClass('is-fixed').css('bottom', 0) : sidebar.removeClass('is-fixed').attr('style', '');
        }
        scrolling = false;
      }
    }

  }

})();

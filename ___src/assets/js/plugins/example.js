/**
 * Set Body Classes
 */

;(function($) {

  setTimeout(function() {
    $('body').addClass('is_ready');
  }, 0), setTimeout(function() {
    $('body').addClass('is_loading');
  }, 1000), setTimeout(function() {
    $('body').addClass('is_loaded');
  }, 2000);

}(jQuery));
/**
 * Load Stage
 */

;(function($) {

  setTimeout(function() {
    $('.stage').addClass('is_ready');
  }, 0), setTimeout(function() {
    $('.stage').addClass('is_loading');
  }, 750), setTimeout(function() {
    $('.stage').addClass('is_loaded');
  }, 1750);

}(jQuery));
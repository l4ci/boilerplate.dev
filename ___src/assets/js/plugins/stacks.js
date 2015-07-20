/**
 * Open Stack Details
 */

// Global ID
var _selectorID;

/**
 * Set classes in responsive Context
 */
;(function($) {
  // Add class to last item per row
  $(window).on('resize', function() {
    if ( $(window).width() >= _dh_options.breakpoints.start ) {
      $('.gallery__items').find('li').removeClass('lastInRow');
      $('.gallery__items li:nth-child(2n+2), .gallery__items li:last-child').addClass('lastInRow');
    }

    if ( $(window).width() >= _dh_options.breakpoints.small ) {
      $('.gallery__items').find('li').removeClass('lastInRow');
      $('.gallery__items li:nth-child(3n+3), .gallery__items li:last-child').addClass('lastInRow');
    }

    if ( $(window).width() >= _dh_options.breakpoints.medium ) {
      $('.gallery__items').find('li').removeClass('lastInRow');
      $('.gallery__items li:nth-child(4n+4), .gallery__items li:last-child').addClass('lastInRow');
    }
  });
  $(window).trigger('resize');
}(jQuery));





/**
 * Open Details Layer after the lastRow Div
 */

;(function($) {
  $.ajaxSetup({cache:false});
  $('.imageStack').on('click', '.showDetails', function(event) {
    event.preventDefault();
    /* Act on the event */

    var _liIndex = $(this).closest('li').index();

    if ( !$(this).hasClass('is_active') ) {

      // Reset ID
      _selectorID = '';

      var _targetContainer = "stackDetails";
      var _loadThis = $(this).data('loadthis');
      _selectorID  = $(this).attr('id');

      var _scrollOffset = $(window).height() * 0.25;
      var _scrollto     = '#stackDetails';

      var _nextLast = $(this).closest('li').nextAll('.lastInRow').first();
      var _wrapper = '<li class="stackDetails" id="stackDetails"><div class="stackDetails__wrapper"></div></li>';

      // Remove Details
      $('.gallery__items').find('.stackDetails').remove();

      // Insert after the last LI / line
      if ( $(this).closest('li').hasClass('lastInRow') ) {
        $(_wrapper).insertAfter($(this).closest('li'));
      } else {
        $(_wrapper).insertAfter(_nextLast);
      }

      // add active class
      $('.gallery__items').find('.showDetails').removeClass('is_active');

      $(this).addClass('is_active');

      // Show Content
      $('.'+_targetContainer).find('.stackDetails__wrapper').load(_loadThis+' #loadThis', function() {

        $.getScript(templateDir+'/assets/js/lightbox.js');
        $('.'+_targetContainer).slideDown(500, function() {


        // Array with the positions
        var _arrowPosition = ['12.5%', '16.666%', '25%', '37.5%', '50%', '62.5%', '75%', '83.333%', '87.5%',];

        // Move the Arrow to the right position
        // With two in a row
        if ( $(window).width() >= _dh_options.breakpoints.start ) {
          if ( _liIndex%2 == 0 ) {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[2]);
          } else {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[6]);
          };
        }

        // With three in a row
        if ( $(window).width() >= _dh_options.breakpoints.small ) {
          if ( _liIndex%3 == 0 ) {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[1]);
          } else if ( _liIndex%3 == 1 ) {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[4]);
          } else if ( _liIndex%3 == 2 ) {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[7]);
          };
        }

        // With four in a row
        if ( $(window).width() >= _dh_options.breakpoints.medium ) {
          if ( _liIndex%4 == 0 ) {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[0]);
          } else if ( _liIndex%4 == 1 ) {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[3]);
          } else if ( _liIndex%4 == 2 ) {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[5]);
          } else if ( _liIndex%4 == 3 ) {
            $('#loadThis').find('.arrow').css('left', _arrowPosition[8]);
          };
        }

          $('html,body').animate({
            scrollTop: $(_scrollto).offset().top - _scrollOffset
          }, 500);

          $('.'+_targetContainer).addClass('is_open');
        });

      });
    }
  });
}(jQuery));


/**
 * Close Details
 */

;(function($){
  $(document).on('click', '.stackDetails__close', function(event) {
    event.preventDefault();
    /* Act on the event */
    _selectorID = '';
    $('.stackDetails').slideUp(500, function() {
      $('.gallery__items').find('.stackDetails').remove();
      $('.gallery__items').find('.showDetails').removeClass('is_active');
    });

  });
}(jQuery));
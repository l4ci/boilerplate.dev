/**
  * Lightbox
  */

;(function($){
  $('.stackDetails__gallery').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
      delegate: 'a', // the selector for gallery item
      type: 'image',
      gallery: {
        enabled:true,
        navigateByImgClick: false,
      },
      callbacks: {
        change: function() {
          this.content.find('figure img').removeClass('is_loaded');
          this.content.find('figure figcaption').removeClass('is_loaded');
        },
        imageLoadComplete: function() {
          this.content.find('figure img').addClass('is_loaded');
          this.content.find('figure figcaption').addClass('is_loaded');
        },
      },
      image: {
        titleSrc: function(item) {
          var headline = item.el.find('img').attr('data-headline');
          var caption = item.el.find('img').attr('data-caption');
          return '<div class="imageMeta"><h4>'+ headline + '</h4><p>' + caption + '</p></div>';
        }
      }
    });
  });

}(jQuery));
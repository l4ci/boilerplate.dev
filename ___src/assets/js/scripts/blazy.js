/**
 * Blazy
 */

;(function($) {

  var bLazy = new Blazy({
    breakpoints: [{
      width: 480,
      src: 'data-src-mobile'
    },
    {
      width: 768,
      src: 'data-src-tablet'
    },
    {
      width: 1280,
      src: 'data-src-laptop'
    }],
    offset: 600
  });

})(jQuery);


// CSS Part
.b-lazy {
  opacity: 0;
  height: 200vh;

  &.b-loaded {
    opacity: 1;
    height: auto;
    transition: height 0s, opacity .5s .25s ease-in-out;
  }
}
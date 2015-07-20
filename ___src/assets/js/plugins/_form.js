/**
  * Lightbox
  */

;(function($){

  $("#event input:radio").change(function() {
    if ($(this).val() == "Nein") {
      $("#eventContent").slideUp(250);
    }
    else {
      $("#eventContent").slideDown(250);
    }
  });

}(jQuery));
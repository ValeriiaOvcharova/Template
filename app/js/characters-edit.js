$(document).ready(function () {
  "use strict";
  
  //Sliders
  $('.slider').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1
  });

  $( '.slick-prev' ).addClass('icon-left-arrow');
  $( '.slick-next' ).addClass('icon-right-arrow');

  $('.slider').on('afterChange', function(slick, currentSlide){
    $(this).find('.slick-current').trigger('click');
    defineLineWidth();
  });

  // TABS  
  $('.tabs-list__item').on('click', function() {
    var tabID = $(this).attr('data-tab');
    $('.active-main-tab').removeClass('active-main-tab');
    $('.active-tab').removeClass('active-tab');
    $(this).addClass('active-main-tab');       
    $("#"+tabID).addClass('active-main-tab').find('.tab-item:first').trigger('click');
  });

  //Line to linked pages
  function defineLineWidth() {
    var $image = $('.personage-settings .active-tab .img-wrapper').not('.blank-img');
    var imgWidth = $image.innerWidth();
    var $activeSetting = $('.slider__item.active-tab');
    var settingWidth = $activeSetting.innerWidth();
    var settingPosition = $activeSetting.offset().left + settingWidth/2;
    var lineLength = 0;

    if ($image.length > 0) {
      var image1Position = $('.personage-settings .active-tab .img-wrapper:eq(0)').offset().left;
      $('.personage-settings').addClass('img-signed');
    } else {
      $('.personage-settings').removeClass('img-signed');
    }
    
    if ($image.length === 1) {
      lineLength = settingPosition - image1Position - imgWidth/2;
    }

    if ($image.length === 2) {
      var image2Position = $('.personage-settings .active-tab .img-wrapper:eq(1)').offset().left;
      if (settingPosition <= image2Position) {
        lineLength = image2Position - image1Position;
      } else {
        lineLength = settingPosition - image1Position - imgWidth/2;
      }      
    }

    if ($image.length > 2) {
      var image3Position = $('.personage-settings .active-tab .img-wrapper:eq(2)').offset().left;
      lineLength = image3Position - image1Position;
    }

    $('.img-signed .line').css('width', lineLength);
  }
  defineLineWidth();
  $(window).on('resize', defineLineWidth);
  
  $('.tabs-list__item, .slider__item').on('click', function() {
    defineLineWidth();
  });

});
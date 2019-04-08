$(document).ready(function () {
  "use strict";

<<<<<<< HEAD
=======
  // SWITCHER
  $('.switch-input').change(function() {
    
    var $switcher = $(this).parent('.switcher');

    $switcher.find('.show').removeClass('show');
    $switcher.find('.hide').removeClass('hide');   

    if($(this).is(':checked')) {
      $switcher.find('.switch-name').addClass('hide');
      $switcher.find('.switch-name__change').addClass('show');
    }
    else{
      $switcher.find('.switch-name').addClass('show');
      $switcher.find('.switch-name__change').addClass('hide');
      
    }
  })

  // FILTER-ADMIN
  $('.filter-btn').on('click', function() {    
    var $filter = $(this).parent('.filter-container');
    $filter.find('.currency-filter').removeClass('currency-filter');
    $(this).addClass('currency-filter');
  });


  // OPEN AND CLOSE RIGHT-BAR  
  $(document).on('click','.modal-btn', function() {
    var nameModal = $(this).data('modal');          
    openWindow(nameModal);
  });

  var $modal;
  $('.close-modal').on('click', function() {
    $modal = $(this).closest('.modal-window');
    closeWindow();
  });
  $(document).on('click', '.bar-overlay', function() {
    $modal = $('.modal-window.open');
    closeWindow();
  });

  function scrollbarWidth() {
    var documentWidth = parseInt(document.documentElement.clientWidth);
    var windowsWidth = parseInt(window.innerWidth);
    var scrollbarWidth = windowsWidth - documentWidth;
    return scrollbarWidth;                
  }    
  var scrollWidth = scrollbarWidth();

  $('.modal-window').css('padding-right', scrollWidth);
  $('.scroll-emul').css('width', scrollWidth);

  function openWindow(win) {
    if(!$('body').hasClass('modal-open')) {
      $('body').addClass('modal-open').css('padding-right', scrollWidth);
    }    
    $('.modal-window.'+win).addClass('open');
    $('.header').css('right', scrollWidth);
  }
  function closeWindow() {
    $modal.removeClass('open');
    if (!$('.modal-window').hasClass('open')) {
      setTimeout(function() {
        $('body').removeClass('modal-open').css('padding-right', '');
        $('.header').css('right', '0');
      }, 600);
    }
  }

  // ORIENTATION
  $('.orientation').on('click', function() {
    var orientation = $(this).data('orient');
    $('.book-orientation__container').removeClass('horizontal vertical').addClass(orientation);
  });

  //FILTERS
  (function() {
    var variant = $('.filters-variant option:selected').val();

    $('.filters-variant').on('change', function() {
      variant = $('.filters-variant option:selected').val();
      $('.selected li').remove();
      $('.options').removeClass('visible');
    });
  
    $('.btn-add-filter').on('click', function() {
      $('#'+ variant).toggleClass('visible');
    });
  
    $('.options li').on('click', function() {
      var currentFilter = $(this).text();
      var filterID = $(this).data('number');
      
      if ($('.selected').find('[data-number=' + filterID + ']').length === 0) {
        $('.selected').append('<li data-number="'+ filterID +'">' + currentFilter + '<span class="icon-close"></span></li>');
        $(this).addClass('disabled');
        $('.options').removeClass('visible');
      }   
    });
  
    $(document).on('click', '.selected .icon-close', function() {
      var filterID = $(this).parent().data('number');
      $(this).parent().remove();
      $('#'+ variant).find('[data-number=' + filterID + ']').removeClass('disabled');
    });
  }());
  
  //Popups in Character-Edit
  var $parent;
  $(document).on('click', '.bubbles', function() {
    $parent = $(this).parents('.container-popup-block');
    var $item = $(this).parents('.edited-item');
    var itemTopPosition = $item.offset().top;

    $('.container-popup-block').not($parent).find('.visible').removeClass('visible');
    $('.popups-container').offset({top: itemTopPosition});

    if ($item.hasClass('gender-item')) {
      $('.specific').removeClass('specific');
      $('.placeholder').addClass('specific');
    } else if ($item.hasClass('superpower-item')) {
      $('.specific').removeClass('specific');
      $('#edit-item').addClass('specific');
    } else {
      $('.specific').removeClass('specific');
    }    

    $(document).on('click', '.edit', function() {
      var field = $(this).data('field');
      var fieldName = $item.find('.label-name').text();
      $('#'+field).val(fieldName);
    });

    $(document).on('click', '.placeholders-list li', function() {
      var placeholderName = $(this).text();      
      $('#edit-placeholder .input-edit').val(placeholderName);
    });

    $(document).on('click', '#edit-item .add-btn', function() {
      $('.superpower-list').append('<li><input type="text" class="input-edit"><button type="button" class="icon-delete"></button></li>');
    });
  });  

  $(document).on('click', '.popup-open-btn', function() {
    var popup = $(this).data('id');
    $parent = $(this).parents('.container-popup-block');
    $parent.find('.popups-container').addClass('visible');
    $('#'+ popup).addClass('visible');
  });
  $(document).on('click', '.closing', function() {
    $(this).parent('.popup').removeClass('visible');
    $(this).parent().parent('.popup').removeClass('visible');
    if (!$('.popup').hasClass('visible')) {
      $parent.find('.popups-container').removeClass('visible');
    }    
  });
  
  //TABS
  $('.tab-item').on('click', function() {
    var tabID = $(this).attr('data-tab');
    $(this).addClass('active-tab').siblings().removeClass('active-tab');        
    $("#"+tabID).addClass('active-tab').siblings().removeClass('active-tab');
  });  

>>>>>>> 8b763406ed3922d672ba51dfa7389080b627c1d1
});
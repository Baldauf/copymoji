$(document).ready(function(){

  $('#search').keyup(function() {
    var keyword = $(this).val().toLowerCase();

    // rebuild on keystroke
    $('.category').removeClass('category--hide');

    // simple search toggle
    $('.emoji__mojo').each( function() {
      $(this).toggle( keyword.length < 1 || $(this).attr('data-models').indexOf(keyword) > -1 );
    });

    // hide categories if no results
    $('.emoji').each( function() {
      if($(this).children(':visible').length == 0) {
        $(this).parent().addClass('category--hide');
      } else {
        $(this).parent().removeClass('category--hide');
      }
    })
  });

  // make clipboard clip
  new Clipboard('.emoji__mojo-tone');

  var clipboard = new Clipboard('.emoji__mojo--copy');

  clipboard.on('success', function(e) {
    function hideCopy(){
      e.trigger.classList.remove('copied');
    }

    e.trigger.classList.add('copied');
    setTimeout(hideCopy, 2000);
    e.clearSelection();
  });

  // Feedback modal: show
  $('#feedback-modal').click(function(e) {
    var modal = $('.page-footer-feedback-form');
    e.preventDefault();
    modal.addClass('page-footer-feedback-form--show');
  });

  // Feedback modal: hide
  $('#feedback-close').click(function(e) {
    var modal = $('.page-footer-feedback-form');
    e.preventDefault();
    modal.removeClass('page-footer-feedback-form--show');
  });

  // smooth scroll to el
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 129
          }, 1000);
          return false;
        }
      }
    });
  });
});

$(window).scroll(function() {    
  var scroll = $(window).scrollTop(),
  search = $(".search"),
  filters = $(".filters")
  filter = $(".filter");

  // lock search & jumpers
  if (scroll >= 173 && scroll < 220) {
    search.addClass("search--lock");
    filters.removeClass("filters--lock");
  }
  else if (scroll >= 220) {
    filters.addClass("filters--lock");
    search.addClass("search--lock");
  } else {
    filters.removeClass("filters--lock");
    search.removeClass("search--lock");
  }

  filter.each( function(e){
    var self = $(this),
        target = $(this.hash),
        text = target.children('.category__text'),
        height = target.height(),
        dist = target.offset().top - 130,
        bottom = height + dist,
        active = 'filter--active';

        console.log(text)

    if(scroll > dist && scroll < bottom) {
      self.addClass(active);
    } else {
      self.removeClass(active)
    }
  });

  // $(".filter--people").each( function(e){
  //   var self = $(this),
  //       target = $(this.hash),
  //       height = target.height(),
  //       dist = target.offset().top,
  //       bottom = height + dist,
  //       active = 'filter--active';

  //       console.log(bottom)

  //   if(scroll > dist && scroll < bottom) {
  //     self.addClass(active);
  //   } else {
  //     self.removeClass(active)
  //   }
  // });
});
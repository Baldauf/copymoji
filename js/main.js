$(document).ready(function(){

  $('#search').keyup(function() {
    var keyword = $(this).val().toLowerCase(),
        cat = $('.category');

    if( !$(this).val() ) {
      cat.removeClass('category--hide');
    }

    $('.emoji__mojo').each( function() {
      $(this).toggle( keyword.length < 1 || $(this).attr('data-models').indexOf(keyword) > -1 );
    });

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
    function doThis(){
      console.log('yo');
      e.trigger.classList.remove('copied');
    }

    e.trigger.classList.add('copied');
    setTimeout(doThis, 2000);
    e.clearSelection();
  });

  clipboard.on('error', function(e) {
    e.trigger.classList.remove('copy-btn--copied');
    e.trigger.classList.add('copy-btn--fail');
  });

  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
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
      filters = $(".filters");

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
});
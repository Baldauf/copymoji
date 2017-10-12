$(document).ready(function(){

  function getQueryVar(v) {
    var query = window.location.search.substring(1)
      , vars = query.split('&')

    for ( var i = 0; i < vars.length; i++ ) {
      var pair = vars[i].split('=')

      if (decodeURIComponent(pair[0]) == v) {
        return decodeURIComponent(pair[1])
      }
    }
  }

  function search(term) {
    // rebuild on keystroke
    $('.category').removeClass('category--hide');

    // simple search toggle
    $('.char__mojo').each( function() {
      $(this).toggle( term.length < 1 || $(this).attr('data-models').indexOf(term) > -1 );
    });

    // hide categories if no results
    $('.char').each( function() {
      if($(this).children(':visible').length == 0) {
        $(this).parent().addClass('category--hide');
      } else {
        $(this).parent().removeClass('category--hide');
      }
    })
  }

  var defaultSearch = getQueryVar('search')

  if(defaultSearch) {
    $('#search').val(defaultSearch)
    search(defaultSearch)
  }

  $('#search').keyup(function() {
    var keyword = $(this).val().toLowerCase();

    search(keyword)
  });

  // make clipboard clip for default + tones
  var clipboard = new Clipboard('.char__mojo--copy');
  var tones = new Clipboard('.char__mojo-tone');

  clipboard.on('success', function(e) {
    var copyBlock = $('.copy-block'),
        copyContent = $(e.trigger).data('clipboard-text');

    function hideCopy(){
      $('.copy-block').removeClass('copy-block--copied');
    }

    copyBlock.find('span').html(copyContent);
    copyBlock.addClass('copy-block--copied');
    setTimeout(hideCopy, 2000);
    e.clearSelection();
  });

  tones.on('success', function(e) {
    var copyBlock = $('.copy-block'),
        copyContent = $(e.trigger).data('clipboard-text');

    function hideCopy(){
      $('.copy-block').removeClass('copy-block--copied');
    }

    copyBlock.find('span').html(copyContent);
    copyBlock.addClass('copy-block--copied');
    setTimeout(hideCopy, 2000);
    e.clearSelection();
  });


  // Widescreen
  $('.page-link--expand').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('page-link--expand-expanded');
    $('.char').toggleClass('char--widescreen');
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

  // needy tab
  var vis = (function(){
    var stateKey, eventKey, keys = {
      hidden: "visibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
      if (stateKey in document) {
        eventKey = keys[stateKey];
        break;
      }
    }
    return function(c) {
      if (c) {
        document.addEventListener(eventKey, c);
        //document.addEventListener("blur", c);
        //document.addEventListener("focus", c);
      }
      return !document[stateKey];
    }
  })();

  vis(function(){
    document.title = vis() ? 'Copychar 😜' : 'Copychar misses you 🙁';
  });

  // to set the initial state
  document.title = vis() ? 'Copychar 😜' : 'Copychar misses you 🙁';
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

        // console.log(text)

    if(scroll > dist && scroll < bottom) {
      self.addClass(active);
    } else {
      self.removeClass(active)
    }
  });
});
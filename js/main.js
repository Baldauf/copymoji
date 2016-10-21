$(document).ready(function(){

  $('#search').keyup(function() {
    var keyword = $(this).val().toLowerCase();

    $('.emoji__mojo').each( function() {
      $(this).toggle( keyword.length < 1 || $(this).attr('data-models').indexOf(keyword) > -1 );
    });
  });

  // make clipboard clip
  new Clipboard('.emoji__mojo--copy');
  new Clipboard('.emoji__mojo-tone');
});

$(window).scroll(function() {    
  var scroll = $(window).scrollTop(),
      filters = $(".filters");
  
  if (scroll >= 270) {
      filters.addClass("filters--lock");
  } else {
    filters.removeClass("filters--lock");
  }
});
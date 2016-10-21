$(document).ready(function(){

  $('#search').keyup(function() {
    var keyword = $(this).val().toLowerCase();

    $('.emoji__mojo').each( function() {
      $(this).toggle( keyword.length < 1 || $(this).attr('data-models').indexOf(keyword) > -1 );
    });
  });
  console.log('bye');

$(document).on('scroll', function(e) {
    var paag = $('#page');
  console.log(paag.scrollTop);

  // if (page.scrollTop > 147) {
  //   console.log("scroll");
  //   $('.page').addClass("fix-search");
  // } else {
  //   $('.page').removeClass("fix-search");
  // }
    
});

  // make clipboard clip
  new Clipboard('.emoji__mojo');
});
// Window Scroll
$(window).scroll(function() {
  var wh = window.innerWidth;
  //Go to top
  if ($(this).scrollTop() > 100) {
    $('.gotop').addClass('goto');
  } else {
    $('.gotop').removeClass('goto');
  }
});
$(".gotop").on("click", function() {
  $("html, body").animate({
    scrollTop: 0
  }, 600);
  return false
});

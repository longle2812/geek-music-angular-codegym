$(document).ready(function () {
  $('div ul li a').click(function(e) {
    $('div ul li a.active').removeClass('active');
    jQuery(this).addClass('active');
    e.preventDefault();
  });
});

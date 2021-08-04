var swiper = new Swiper('.swiper-container', {
  slidesPerView: 6,
  spaceBetween: 30,
  loop: true,
  speed: 1500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1800: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  },
});
// Recent Slider
var swiper = new Swiper('.ms_rcnt_slider .swiper-container', {
  slidesPerView: 6,
  spaceBetween: 30,
  loop: true,
  speed: 1500,
  navigation: {
    nextEl: '.swiper-button-next5',
    prevEl: '.swiper-button-prev5',
  },
  breakpoints: {
    1800: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  },
});
// Featured Slider
var swiper = new Swiper('.ms_feature_slider.swiper-container', {
  slidesPerView: 6,
  spaceBetween: 30,
  loop: true,
  speed: 1500,
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev1',
  },
  breakpoints: {
    1800: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  },
});
// New released Slider
var swiper = new Swiper('.ms_release_slider.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 30,
  speed: 1500,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next2',
    prevEl: '.swiper-button-prev2',
  },
  breakpoints: {
    1800: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  },
});
// Featured Album Slider
var swiper = new Swiper('.ms_album_slider.swiper-container', {
  slidesPerView: 6,
  spaceBetween: 30,
  loop: false,
  speed: 1500,
  navigation: {
    nextEl: '.swiper-button-next3',
    prevEl: '.swiper-button-prev3',
  },
  breakpoints: {
    1800: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  },
});
// Radio Slider
var swiper = new Swiper('.ms_radio_slider.swiper-container', {
  slidesPerView: 6,
  spaceBetween: 30,
  loop: true,
  speed: 1500,
  navigation: {
    nextEl: '.swiper-button-next4',
    prevEl: '.swiper-button-prev4',
  },
  breakpoints: {
    1800: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  },
});
// Testimonial Slider
var swiper = new Swiper('.ms_test_slider.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerColumn: 1,
  loop: false,
  speed: 1500,
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev1',
  },
  breakpoints: {
    1400: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 1,
    },
  },
});

$(".ms_more_icon").on('click', function(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  if (typeof $(this).attr('data-other') != 'undefined') {
    var target = $(this).parent().parent();
  } else {
    var target = $(this).parent();
  }
  if (target.find("ul.more_option").hasClass('open_option')) {
    target.find("ul.more_option").removeClass('open_option');
  } else {
    $("ul.more_option.open_option").removeClass('open_option');
    target.find("ul.more_option").addClass('open_option');
  }
});
$(document).on("click", function(e) {
  $("ul.more_option.open_option").removeClass("open_option");
})
// On Button Click
$(".ms_btn.play_btn").on('click', function() {
  $('.ms_btn.play_btn').toggleClass('btn_pause');
});
$(document).on('click', '#playlist-wrap ul li .action .que_more', function(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  $('#playlist-wrap ul li .action .que_more').not($(this)).closest('li').find('.more_option').removeClass('open_option');
  $(this).closest('li').find('.more_option').toggleClass('open_option');
});
// $('.jp-playlist').on('click', function(){
// $('#playlist-wrap ul li .more_option').removeClass('open_option');
// });

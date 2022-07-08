(function($) {
    "use strict";

    $(document).ready(function() {

        /*---------------------------------------------------
            sticky header
        ----------------------------------------------------*/
        $(window).on('scroll', function() {
            var scroll = $(window).scrollTop();
            if (scroll < 100) {
                $(".mainmenu").removeClass("sticky");
            } else {
                $(".mainmenu").addClass("sticky");
            }
        });








    }(jQuery));
});

/*---------------------------------------------------
        animation-on-scroll
    ----------------------------------------------------*/
AOS.init({
    duration: 1200,
    once: true
});



/*---------------------------------------------------
        home-main-banner
    ----------------------------------------------------*/

$('.home-main-banner').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    dots: false,
    pauseOnDotsHover: true,
    cssEase: 'linear',
    swipe: true,
    fade: false,
    draggable: false,
    prevArrow: "<img class='a-left control-c prev slick-prev' src='./wp-content/themes/kavittheme/assets/images/arrow-left.png'>",
    nextArrow: "<img class='a-right control-c next slick-next' src='./wp-content/themes/kavittheme/assets/images/arrow-right.png'>"
});
/*---------------------------------------------------
        how-we-work-banner
    ----------------------------------------------------*/

$('.how-we-work').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    dots: false,
    pauseOnDotsHover: true,
    cssEase: 'linear',
    swipe: true,
    fade: false,
    draggable: false,
    prevArrow: "<img class='a-left control-c prev slick-prev' src='./wp-content/themes/kavittheme/assets/images/arrow-left.png'>",
    nextArrow: "<img class='a-right control-c next slick-next' src='./wp-content/themes/kavittheme/assets/images/arrow-right.png'>"
});


/*---------------------------------------------------
       counter
    ----------------------------------------------------*/

$.fn.jQuerySimpleCounter = function(options) {
    var settings = $.extend({
        start: 0,
        end: 100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options);

    var thisElement = $(this);

    $({
        count: settings.start
    }).animate({
        count: settings.end
    }, {
        duration: settings.duration,
        easing: settings.easing,
        step: function() {
            var mathCount = Math.ceil(this.count);
            mathCount = mathCount + "<span class='count_plus_sign'>+</span>";
            thisElement.html(mathCount);
        },
        complete: settings.complete
    });
};

var x1 = $('#n1').val();
var y1 = parseInt(x1);
var x2 = $('#n2').val();
var y2 = parseInt(x2);
var x3 = $('#n3').val();
var y3 = parseInt(x3);
var x4 = $('#n4').val();
var y4 = parseInt(x4);
// alert(x);
$('#number1').jQuerySimpleCounter({
    end: y1,
    duration: 3000
});
$('#number2').jQuerySimpleCounter({
    end: y2,
    duration: 3000
});
$('#number3').jQuerySimpleCounter({
    end: y3,
    duration: 2000
});
$('#number4').jQuerySimpleCounter({
    end: y4,
    duration: 2500
});



/*---------------------------------------------------
         news
    ----------------------------------------------------*/

$(".testimonial-reel").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    centerMode: true,
    centerPadding: "10px",
    dots: true,
    slidesToShow: 3,
    infinite: true,
    arrows: false,
    lazyLoad: "ondemand",
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                centerMode: false
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

/* product cat slider on home page
 */

$(".product-cat-slider").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    centerMode: true,
    centerPadding: "10px",
    dots: true,
    slidesToShow: 4,
    infinite: true,
    arrows: false,
    lazyLoad: "ondemand",
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                centerMode: false
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

/* product home slider done*/

// mega_menu


jQuery(document).on('click', '.mega-dropdown', function(e) {
    e.stopPropagation()
});
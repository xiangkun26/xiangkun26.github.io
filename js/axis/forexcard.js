var windowWidth = $(window).width()
  , windowHeight = $(window).height();
function forexAccordian() {
    $(document).on("click", ".thsSholdHelpWrap .accord-head", function() {
        $(this).hasClass("active") ? $(this).removeClass("active").next(".accord-body").slideUp(300) : ($(".thsSholdHelpWrap .accord-head").removeClass("active"),
        $(".thsSholdHelpWrap .accord-body").slideUp(300),
        $(this).addClass("active").next(".accord-body").slideDown(300))
    })
}
function forexCharm() {
    $(document).on("mouseenter", ".forexCharmIcon", function() {
        $(this).parent(".forexCharm").stop(!0, !0).addClass("forexCharmActive")
    }),
    $(document).on("mouseleave", ".forexCharm", function() {
        $(this).removeClass("forexCharmActive").stop(!0, !0)
    }),
    $(document).on("click", ".forexCharmIcon", function() {
        $(this).parent(".forexCharm").toggleClass("forexCharmActive")
    })
}
function mobilecardtab() {
    $(document).on("click", ".js_mobilecardtab .resBox", function() {
        var card = $(this).attr("fortab");
        $(this).addClass("active").siblings().removeClass("active"),
        "Trave_withforex" == card && ($(".wrapOne").addClass("active"),
        $(".wrapTwo, .wrapThr").removeClass("active")),
        "Trave_withdebit" == card && ($(".wrapTwo").addClass("active"),
        $(".wrapOne, .wrapThr").removeClass("active")),
        "Trave_withimportant" == card && ($(".wrapThr").addClass("active"),
        $(".wrapTwo").removeClass("active"));
        var $this = $(this)
          , scrollContLeft = $($this).parents(".js_mobilecardtab").scrollLeft()
          , leftscroll = $($this).position().left + scrollContLeft;
        $($this).parents(".js_mobilecardtab").animate({
            scrollLeft: leftscroll
        }, 500)
    })
}
$(document).ready(function() {
    $(".axisWrap ").hasClass("forexcard") && (forexAccordian(),
    forexCharm(),
    $(".js_mobilecardtab").length && windowWidth < 768 && mobilecardtab())
});

if($(window).width() >= 992){
$(".travelForex .owl-carousel").owlCarousel({
items: 3,
loop: false,
autoplay: false,
autoplayTimeout: 3000,
autoplayHoverPause: true,
nav: true,
navText: ["",""]
});
}
if($(window).width() < 991){
$(".travelForex .owl-carousel").owlCarousel({
items: 1,
loop: false,
autoplay: false,
autoplayTimeout: 3000,
autoplayHoverPause: true,
nav: true,
navText: ["",""]
});
}
var counter = 1;

function globlaAccordian() {
    $(".accordianRow").hide(), $(".accordianRow:first").show(), $(".js-accordianBox h4").attr("role", "button"), $(".js-accordianBox h4:first").addClass("current"), $(document).on("click", ".js-accordianBox h4", function () {
        $(this).hasClass("current") ? ($(this).next(".accordianRow").slideDown(500), $(this).attr({
            "aria-expanded": "false"
        })) : ($(".accordianRow").slideUp(400), $(".js-accordianBox h4").removeClass("current"), $(this).addClass("current"), $(this).next(".accordianRow").slideDown(400), $(this).attr({
            "aria-expanded": "true"
        }))
    }), $(document).on("keyup", ".js-accordianBox h4", function (e) {
        13 == (e.keyCode || e.which) && $(this).trigger("click")
    })
}

function readMoreLess() {
    var xyz = $(".moreCont").outerHeight(!0);
    $(".moreNless").attr({
        "aria-expanded": "true",
        role: "button"
    }), $(".contentBox .moreNless").click(function (e) {
        e.preventDefault();
        var text = $(this).text();
        "Read More" == text ? ($(this).parents(".contentBox").find(".moreCont").css({
            height: xyz,
            overflow: "inherit"
        }), $(this).text(text.replace("Read More", "Read Less")), $(".moreNless").attr({
            "aria-expanded": "true"
        })) : ($(this).parents(".contentBox").find(".moreCont").css({
            height: xyz,
            overflow: "hidden"
        }), $(this).text(text.replace("Read Less", "Read More")), $(".moreNless").attr("aria-expanded", "false")), maxHgt()
    })
}
$(document).ready(function(){
  $('.multiRead .moreNless').on('click', function(){
    $('.contentBox').css('height', 'auto');
  });
});
function regionalReadMoreLess() {
    var xyz = $(".moreCont").outerHeight(!0);
    $(".contentBox .moreNlessReg").click(function (e) {
        e.preventDefault(), $(".regional").length && ($(this).parents(".contentBox").find(".moreCont").toggleClass("expandedHeight"), $(this).parents(".contentBox").find(".moreCont").css({
            height: xyz
        }), $(this).find(".rdMore").toggleClass("active"), $(this).find(".rdLess").toggleClass("active"), $("html,body").animate({
            scrollTop: $(".loanFacilityBox").offset().top
        }, "slow"), maxHgt())
    })
}

function maxHgt() {
    $(".contentBox").css("height", "auto");
    var maxHeight_1p = 0;
    $(".contentBox").each(function () {
        $(this).outerHeight(!0) > maxHeight_1p && (maxHeight_1p = $(this).outerHeight(!0))
    }), $(".contentBox").outerHeight(maxHeight_1p)
}

function loanMScroll() {
    windowWidth < 768 && ($(document).on("click", ".mNext", function () {
        if (counter <= 3) {
            $(".loansListWrapper ul").scrollLeft();
            $(".loansListWrapper").animate({
                scrollLeft: "+=150"
            }, 800)
        }
        counter < 3 && counter++, 3 == counter && ($(this).addClass("disabled"), $(".mPrev").removeClass("disabled"))
    }), $(document).on("click", ".mPrev", function () {
        if (counter <= 3) {
            $(".loansListWrapper ul").scrollLeft();
            $(".loansListWrapper").animate({
                scrollLeft: "-=150"
            }, 800)
        }
        1 < counter && counter--, 1 == counter && ($(this).addClass("disabled"), $(".mNext").removeClass("disabled"))
    }))
}

function sitemaplink() {
    $(".aboutscroll ul li a").click(function (e) {
        e.preventDefault();
        var linkLoc = $(this).attr("href");
        window.location.replace(linkLoc + "#menuTab")
    })
}

function scrollPatch() {
    var abc = window.location.href,
        lastChar = abc.substr(abc.indexOf("#") + 1);
    console.log(lastChar), "menuTab" == lastChar && null != $(".loanFacilityBox").offset() && $("body, html").animate({
        scrollTop: $(".loanFacilityBox").offset().top - 5
    }, 1e3)
}

function viewmore() {
    $(".viewBtn").click(function () {
        $(".showlessList").slideDown(), $(".viewBtn").hide()
    })
}
$(document).ready(function () {
    $(".accordion-toggle").on("click", function (event) {
        event.preventDefault();
        var accordion = $(this),
            accordionContent = accordion.next(".panel-body");
        accordion.toggleClass("open"), accordionContent.slideToggle(250)
    }), regionalReadMoreLess(), viewmore()
});
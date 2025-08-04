function innerTab() { $(".innercontent").hide(), $(".innercontent:first").show(), $(".innerTab li").on("click", function(e) { e.stopPropagation(); var innerAbc = $(this).attr("data-tab");
    $(".innercontent").removeClass("current").hide(), $(this).addClass("current").siblings().removeClass("current"), $("#" + innerAbc).fadeIn(600).addClass("current") }) }

function ulToSelect() {
function DropDown(el) { this.dd = el, this.placeholder = this.dd.children("span"), this.opts = this.dd.find("ul.dropdown > li"), this.val = "", this.index = -1, this.initEvents() } DropDown.prototype = { initEvents: function() { var obj = this;
        obj.dd.on("click", function(event) { return $(this).toggleClass("active"), !1 }), obj.opts.on("click", function() { var opt = $(this);
            obj.val = opt.text(), obj.index = opt.index(), obj.placeholder.text(obj.val) }) }, getValue: function() { return this.val }, getIndex: function() { return this.index } }, $(function() { new DropDown($("#dd"));
    $(document).click(function() { $(".wrapper-dropdown-3").removeClass("active") }) }) }

function checkButton() { $(".switch input").on("change", function() { $(this).is(":checked") ? ($(this).parents(".checkbox-slider").addClass("active"), $(this).parents(".checkbox-slider").find(".label2").addClass("white"), $(this).parents(".checkbox-slider").find(".label1").removeClass("white")) : ($(this).parents(".checkbox-slider").removeClass("active"), $(this).parents(".checkbox-slider").find(".label1").addClass("white"), $(this).parents(".checkbox-slider").find(".label2").removeClass("white")) }) }
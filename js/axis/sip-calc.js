$(document).scroll(function () {
    if (window.innerWidth < 860) {
        var y = $(this).scrollTop();
        if (y > 950) {
            $('.mob-apply').fadeIn();
        } else {
            $('.mob-apply').fadeOut();
        }
    }
});

$(document).ready(function () {
    calValidation(); /*empty feild validation*/

    /*calling function for individual range sliders*/
    /* parameters to be set obj(dom selector), grid and year are boolean values--------- eligibilityrangeSliderInitiation(obj, min, max, from, step, grid, year)----------------- */

    if ($('input[name="slider"]').length) {
        calculatorRangeSlider($("#loanAmtSlider"), 500000, 50000000, 500000, 500, true, false, false, "loanAmtSlider");
        calculatorRangeSlider($("#tensureSlider"), 1, 30, 20, 1, true, true, false, "tensureSlider");
        calculatorRangeSlider($("#intrRateSlider"), 8, 15, 12, 1, true, false, true, "intrRateSlider");
    }

$('#sipInvest').on('click', function () {
    if ($('input[name="slider"]').length) {
        calculatorRangeSlider($("#loanAmtSliderInv"), 5000, 500000, 5000, 100, true, false, false, "loanAmtSlider");
    }
    //$('#loanAmtSlider').slider('refresh');
    
    $('.wantTo').hide();
    $('.canInvest').show();
    $('.sipInv').show();
    $('.monAmt').hide();
    sipInvestGet();
    
    
});

    updateRangeSlider(); /*on load and recursive function for remove common from numeric value and update range slider*/
    $('.inpt').each(function () {
        $(this).on("focus", function () {
            $(this).val($(this).val().replace(/[,]/g, ''));
        });
        calEMIval();
        sipInvestGet();

    });
    $(document).on('blur change', '.txtBox', function () {
        validateNetWeight($(this));
    });

    $('.inpt').each(function () {
        $(this).focusout(function () {
            $(this).val($(this).val().replace(/[,]/g, ''));
            $(this).val(ThousandSeparate($(this).val()));

        });

    });

});

function updateRangeSlider() {
    $('.inpt').each(function () {
        $(this).on("change", function () {
            valuetoassignComa = $(this).val();
            valuetoassign = valuetoassignComa.replace(/[,]/g, ''); //12th Sep 2016
            slidertochange = $(this).parents('.inpt-statement').siblings('.irs-hidden-input').prop("id");
            slidertoupdate = $('#' + slidertochange).data("ionRangeSlider");
            slidertoupdate.update({
                from: parseInt(valuetoassign)
            });
        });
    });
}

function calculatorRangeSlider(obj, min, max, from, step, grid, year, percentage, objName) {
    var $range = obj;

    $range.ionRangeSlider({
        type: "single",
        min: min,
        max: max,
        from: from,
        step: step,
        grid: grid,
        prettify_enabled: true,


        prettify: function (num) {
            if (year == true) {
                //num = (num < 2 ? num + " Yr" : num + " Yrs");
                return num;
            } else if (percentage == true) {
                num = num + "%";
                return num;
            } else {
                return rangenumDifferentiation(num)
            }
        },
        onStart: function (data) {
            if (objName == "intrRateSlider")
                $range.parent('.inpt-slider').find('.inpt').val(numberFormatter(data.from) + "%");
            else
                $range.parent('.inpt-slider').find('.inpt').val(numberFormatter(data.from));

        },
        onFinish: function (data) {
            $range.parent('.inpt-slider').find('.inpt').trigger('blur');
            calEMIval();
            sipInvestGet();
        }
    });

    $range.on("change", function () {
        var $this = $(this),
            value = $this.prop("value");
        if ($this.prop("id") == "intrRateSlider")
            $this.parent('.inpt-slider').find('.inpt').val(numberFormatter(value) + "%");
        else {
            $this.parent('.inpt-slider').find('.inpt').val(numberFormatter(value));
            //if ($this.prop("id") == "tensureSlider") { Amortization(); }
        }

        $(this).parents('.inpt-slider').find('.clssErrorMsg').css('visibility', 'hidden');
        $(this).parents('.inpt-slider').find('.inputBox').removeClass('errorBorder');
    });

}

function numberFormatter(x) {
    x = x.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0)
        afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res;
}

function ThousandSeparate(x) {
    x = x.toString();

    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;


}

function rangenumDifferentiation(val) {
    var aryLabel = new Array('K', 'L', 'Cr');
    if (val >= 10000000) {
        val = (val / 10000000);
        return val.toFixed(0) + '' + aryLabel[2];
    } else if (val >= 100000) {
        val = (val / 100000);
        return val.toFixed(0) + '' + aryLabel[1];
    } else if (val < 100000) {
        val = (val / 1000);
        val = val.toFixed(0) + '' + aryLabel[0];
    } else if (val = 0) {
        val = val.toFixed(0);
    }
    return val;
}

function calValidation() {
    $('.numbersOnly').keypress(function (e) {
        var error_div = $(this).parent().find('.error_message');
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            error_div.html('Number only.');
            error_div.css('display', 'block');
            return false;
        } else {
            error_div.html('');
            error_div.css('display', 'none');
        }
    });
    $('.inputBox input').keyup(function (e) {
        if (e.which == 13) {
            $(this).blur();
        }

        var currentVal = $(this).val().replace(/[,]/g, '');
        if (currentVal >= $(this).data("minval") && currentVal <= $(this).data("maxval")) {
            $(this).parents('.inpt-statement').find('.clssErrorMsg').css('visibility', 'hidden');
            $(this).parent().removeClass('errorBorder');
        } else {
            $(this).parents('.inpt-statement').find('.clssErrorMsg').css('visibility', 'visible');
            $(this).parent().addClass('errorBorder');
        }

    });
    $(".numbersDecimal").on("input", function (evt) {
        var self = $(this);
        self.val(self.val().replace(/[^0-9\.]/g, ''));
        if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
            evt.preventDefault();
        }
    });

}

var flag = false;

function validateNetWeight(obj) {

    if (obj.val() == "" || obj.val() == 0) {
        obj.parents('.inputBox').addClass('errorBr');
        flag = false;
    } else {
        obj.parents('.inputBox').removeClass('errorBr');
        flag = true;
    }
    return flag;
}
//new
//var emi2Dec

function calEMIval() {

    var Total_Investment = $('#loan_amount').val().replace(/,/g, "");
    var Tenure = $('#tenure').val();
    var rateOfIntrest = parseFloat($('#interest_rate').val().replace("%", "")) / 100;
    rate = rateOfIntrest / 12;
    nperiod = Tenure * 12;
    fv = -Total_Investment;
    type = 0;
    var backwardValue = numberFormatter(calculatorPMT(rate, nperiod, '', fv, type).toFixed(0));
    console.log(backwardValue);
    $('#lblEMIAmt').text(backwardValue);
}
function calculatorPMT(rate, nperiod, pv, fv, type) {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv) / nperiod;

    var pvif = Math.pow(1 + rate, nperiod);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
        pmt /= (1 + rate);
    }
    ;

    return pmt;
}

function sipInvestGet() {

    var Total_Investment = $('#loan_amountInv').val().replace(/,/g, "");
    var Tenure = $('#tenure').val();
    var rateOfIntrest = parseFloat($('#interest_rate').val().replace("%", ""));
    A = 12 * Tenure;
    B = parseFloat(rateOfIntrest / 12);

    var tnrInv = Tenure * 12;

    var invAmt = Total_Investment * tnrInv;
    $('#InvestedAmt').text(dispNum(invAmt));

    //get future value calculation
    futureValue = parseFloat(-SIPCalculator(rateOfIntrest, A, Total_Investment, 0, 1, Tenure));

    //get comma separated value
    res = dispNum(futureValue);

    $('#sipReturnAmnt').text(res);

}

function SIPCalculator(returnspercent, nper, PMT, pv, type, Tenure) {
    var fv;
    try {
        var e9 = PMT;
        var e10 = (returnspercent) / 12;
        e10 = (e10 / 100);
        var e11 = nper;
        var frm1 = (1 + e10);
        var frm2 = Math.pow(frm1, e11);
        var frm3 = (frm2 - 1);
        var frm4 = (frm3 / e10);
        var frm5 = e9 * frm4;
        fv = frm5 * (-1);
        //fv = (PMT * (1 + rate * type) * (1 - Math.pow(1 + rate, nper))) / (rate - pv * Math.pow(1 + rate, nper));
    } catch (error) {
        console.log(error.message);
    }
    return fv.toFixed(0);
}
$('.sipInv').hide();
$('.canInvest').hide();

$('#sipGoal').on('click', function () {
    calEMIval();
    $('.wantTo').show();
    $('.canInvest').hide();
    $('.sipInv').hide();
    $('.monAmt').show();
});

//Loan amount
$('#loan_amount').on('change', function () {

    if ($('#loan_amount').val() > 50000000) {
        $('#loan_amount').val('5,00,00,000');
    }

    if ($('#loan_amount').val() < 500000) {
        $('#loan_amount').val('5,00,000');
    }
    calEMIval();
});
$('#loan_amountInv').on('change', function () {

    if ($('#loan_amountInv').val() > 500000) {
        $('#loan_amountInv').val('5,00,000');
    }

    if ($('#loan_amountInv').val() < 5000) {
        $('#loan_amountInv').val('5,000');
    }
    sipInvestGet();
});

//Rate of interest
$('#interest_rate').on('change', function () {

    if ($('#interest_rate').val() > 15) {
        $('#interest_rate').val('15%');
    }

    if ($('#interest_rate').val() < 8) {
        $('#interest_rate').val('8%');
    }
    calEMIval();
    sipInvestGet();
});

//Tenure
$('#tenure').on('change', function () {

    if ($('#tenure').val() > 30) {
        $('#tenure').val('30');
    }

    if ($('#tenure').val() < 1) {
        $('#tenure').val('1');
    }
    calEMIval();
    sipInvestGet();
});

function dispNum(n) {
    var nStr = Math.round(n);
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    var z = 0;
    var len = String(x1).length;
    var num = parseInt((len / 2) - 1);

    while (rgx.test(x1)) {
        if (z > 0) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        } else {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
            rgx = /(\d+)(\d{2})/;
        }
        z++;
        num--;
        if (num == 0) {
            break;
        }
    }
    return x1 + x2;
}
function Getdecimal(e) {
    a = e.keyCode || e.which;
    b = $('#interest_rate').val().replace("%", "");

    if (a === 46 && b.indexOf(".") >= 0) {
        return false;
    } else if (a != 8 && a != 0 && (a < 48 || a > 57) && a != 46) {
        return false;

    }

}
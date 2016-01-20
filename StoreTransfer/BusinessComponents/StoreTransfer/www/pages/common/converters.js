define([],
function () {
    function pad(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    function getDate(dateString) {
        var date = dateString.split("-");
        return { month: date[1], date: date[2], year: date[0] };

    }

    function booleanToValueConverter(value, booleanArray) {
        if (booleanArray.indexOf(false) + 1 || booleanArray.indexOf() + 1 || booleanArray.indexOf(null) + 1 || booleanArray.indexOf(0) + 1) {
            return value;
        }
        return '';
    }
    return {
        booleanToClassConverter: function (className) {
            return booleanToValueConverter(className, Array.prototype.slice.call(arguments, 1));
        },
        booleanToVisibilityConverter: function () {
            return booleanToValueConverter('hide', Array.prototype.slice.call(arguments));
        },
        booleanToDisabledConverter: function() {
            return booleanToValueConverter('disabled', Array.prototype.slice.call(arguments));
        },
        booleanUnitToTextConverter: function (isUnitUS) {
            return isUnitUS ? "Feet/Inches" : "Meter/cm";
        },
        booleanToSelectedConverter: function (isTrue) {
            return (isTrue) ? "selected" : "";
        },
        booleanToCheckedConverter: function(isTrue) {
            return (isTrue) ? "checked" : "";
        },
        formatDateConverter: function (date) {
            if (!date.month) {
                date = getDate(date);
            }
            return pad(date.month, 2) + "/" + pad(date.date, 2) + "/" + pad(date.year, 4);
        },
        phoneNumberConverter: function (number) {
            return number.areaCode + "-" + number.local.slice(0, 3) + "-" + number.local.slice(3, 7);
        }
    };
});
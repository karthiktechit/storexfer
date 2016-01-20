"use strict";

// Use this as a quick template for future modules
define([
    App.UnitConverter.path + "views/converterData"
],
function( ConverterData ) {
    return {
        CURRENT_PRECISION: 6,
        DECIMAL_SIGN: ".",
        WHITESPACE_SIGN: " ",
        PLUS_SIGN: "+",
        EXPONENTIAL_SIGN: "E",
        EQUAL_SIGN: "=",
        enteredUnit: 0,

        convertUnit: function(fromUnit, toUnit, enteredUnit) {
            var result = "";

            try {
                if (this.fromUnit != null && this.toUnit != null) {
                    var fromMultiplier = 1;
                    var toMultiplier = 1;
                   // console.log(toMultiplier);
                    result = doConversion(this.fromUnit, fromMultiplier, this.toUnit, toMultiplier, this.enteredUnit);
                }

            } catch(ex) {

              //  console.log(toMultiplier);

            }
            return result;
        },

        doConversion: function(fromUnit, fromMultiplier, toUnit, toMultiplier, enteredUnit) {
            var result = "";
            var inTempValue = 0;
            var outValue = 0;
            try {
                inTempValue = this.enteredUnit * parseInt(this.fromUnit.Scale) * Math.pow(this.fromMultiplier, parseInt(this.fromUnit.Power));
                outValue = (inTempValue + (this.fromUnit.Offset - this.toUnit.Offset)) / (this.toUnit.Scale * Math.pow(this.fromMultiplier, this.fromUnit.Power));
                result = outValue;
            } catch(err) {
                AppHelper.Log.Error("Error converting unit. ", err);
            }

            return result;
        },
    };
});

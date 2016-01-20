"use strict";

define(["jquery", "spin"], function($, Spinner) {
    /*
    * Augment String.prototype to allow for easier formatting. This implementation
    * doesn"t completely destroy any existing String.prototype.format functions,
    * and will stringify objects/arrays
    */
    String.prototype.format = function(i, safe, arg) {
        function format() {
            var str = this,
                len = arguments.length + 1;
            // For each {0} {1} {n...} replace with the argument in that position.  If 
            // the argument is an object or an array it will be stringified to JSON.
            for (var i = 0; i < len; arg = arguments[i++]) {
                safe = typeof arg === "object" ? JSON.stringify(arg) : arg;
                str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "g"), safe);
            }
            return str;
        }
        // Save a reference of what may already exist under the property native.  
        // Allows for doing something like: if("".format.native) { /* use native */ }
        format.native = String.prototype.format;
        // Replace the prototype property
        return format;
    }();

    $.fn.spin = function(opts, color) {
        var presets = {
            "tiny": { lines: 8, length: 2, width: 2, radius: 3 },
            "small": { lines: 8, length: 4, width: 3, radius: 5 },
            "large": { lines: 10, length: 8, width: 4, radius: 8 }
        };
        if (Spinner) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data();

                if (data.spinner) {
                    data.spinner.stop();
                    delete data.spinner;
                }
                if (opts !== false) {
                    if (typeof opts === "string") {
                        if (opts in presets) {
                            opts = presets[opts];
                        } else {
                            opts = {};
                        }
                        if (color) {
                            opts.color = color;
                        }
                    }
                    data.spinner = new Spinner($.extend({ color: $this.css("color") }, opts)).spin(this);
                }
            });
        } else {
            throw "Spinner class not available.";
        }
    };

    return {
        loadCSS: function (url) {
            url = require.toUrl(url);
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        },
        Wait: function(wait) {
            if (wait) {
                //hourglass.setEMML("visibility:Visible");
                $("#container-view").spin("large", "#F96302");
            } else {
                //hourglass.setEMML("visibility:Hidden");
                $("#container-view").spin(false);
            }
        },
        loadImage: function (tag, url) {
            document.getElementById(tag).src = require.toUrl(url);
        },
        getNumberValue: function (str) {
            var numberValue = 0;
            if (str != undefined && str.trim().length > 0) {
                numberValue = parseInt(str);
            }
            return numberValue;
        },
        Ajax: {
            Get: function(url, success, error) {
                //Log.Info("[GET - Started] " + url);
                $.ajaxSettings.isLocal = true;
                $.ajaxSettings.crossDomain = true;
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    timeout: 150000,
                    //jsonpCallback: 'test',
                    contentType: "application/json",
                    success: function(response) {
                        //alert("Get Sucess Ended:: " +response);
                        //Log.Info("[GET - Ended] " + url);
                        success(response);
                    },
                    error: function(response) {
                        //alert("Get Error Ended :: " +response);
                        //Log.Info("[GET - Ended] " + url);
                        error(response);
                    }
                });
            },
            DownloadFile: function(url, success, error) {
                //Log.Info("[GET - Started] " + url);
                $.ajaxSettings.isLocal = true;
                $.ajaxSettings.crossDomain = true;
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    timeout: 30000,
                    //jsonpCallback: 'test',
                    contentType: "application/octet-stream",
                    success: function(response) {
                        //alert("Get Sucess Ended:: " +response);
                        //Log.Info("[GET - Ended] " + url);
                        success(response);
                    },
                    error: function(response) {
                        //alert("Get Error Ended :: " +response);
                        //Log.Info("[GET - Ended] " + url);
                        error(response);
                    }
                });
            },
            Post: function(url,pdata,success, error) {
                //Log.Info("[POST - Started] " + url);
                $.ajaxSettings.isLocal = true;
                $.ajaxSettings.crossDomain = true;
                $.ajax({
                    type: "POST",
                    url: url,
                    // accepts: "application/json",
                    dataType:"json",
                    contentType:"application/json",
                    data: pdata,
                    timeout: 20000,
                    success: function(response) {
                        //alert("POST Sucess Ended:: " +response);
                        //Log.Info("[POST - Ended] " + url);
                        success(response);
                    },
                    error: function(response) {
                        //alert("POST Error Ended:: " +response);
                        //Log.Info("[POST - Ended] " + url);
                        error(response);
                    }
                });
            }
        }
    };
});
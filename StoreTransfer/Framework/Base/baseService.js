"use strict";

define( ["jquery"],
function ( $ ) {
    
    $.ajaxSettings.isLocal = true;
    $.ajaxSettings.crossDomain = true;
    
    var get = function(url, data) {
            return $.ajax({
                url: url,
                contentType: "application/json",
                dataType: "jsonp",
                data: data,
            });
    };
    
    var post = function(url, data) {
            return $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                dataType: "jsonp",
                data: data,
            });
    };

    return {
        GET: get,
        POST: post
    };
});
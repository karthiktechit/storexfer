/// <reference path="../lib/js/jquery-1.8.2.min.js" />
/// <reference path="../lib/js/underscore.js" />
/// <reference path="../lib/js/backbone.js" />
/// <reference path="../lib/js/text.js" />
"use strict";

require.config( {
    baseUrl: "/",
    paths: {
        // 3rd party libraries
        jquery: "StoreTransfer/Framework/lib/js/jquery-1.8.2.min",
        underscore: "StoreTransfer/Framework/lib/js/underscore",
        backbone: "StoreTransfer/Framework/lib/js/backbone",
        text: "StoreTransfer/Framework/lib/js/text",
    },
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        }
    }
} );

define( [
    "require",
    "jquery",
    "underscore"
], function ( require, $, _ ) {

    var path = require.toUrl("./");

    // Defer Qunit so RequireJS can work its magic and resolve all modules.
    QUnit.config.autostart = false;

    var testsuite = [ $( "script[src$='/require.js']" ).data("testsuite") ];

    // Resolve all testModules and then start the Test Runner.
    require( testsuite, QUnit.start );
});



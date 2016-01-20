"use strict";

//init requirejs environment
require.config( {
    baseUrl: "/",
    paths: {
        // 3rd party libraries
        jquery: "StoreTransfer/Framework/lib/js/jquery-1.9.1",
        jqmconfig: "StoreTransfer/Framework/lib/js/jqm-config",
        
        underscore: "StoreTransfer/Framework/lib/js/underscore",
        backbone: "StoreTransfer/Framework/lib/js/backbone",
        bootstrap : "StoreTransfer/Framework/lib/js/bootstrap",
        
        text: "StoreTransfer/Framework/lib/js/text",
        log4js: "StoreTransfer/Framework/lib/js/log4javascript_uncompressed",
        spin: "StoreTransfer/Framework/lib/js/spin",

        apparch: "StoreTransfer/Framework/modules/apparch",
        baseApp: "StoreTransfer/Framework/Base/baseApp",
        baseBusinessComponent: "StoreTransfer/Framework/Base/baseBusinessComponent",
        basePageView: "StoreTransfer/Framework/Base/basePageView",
        basePageModel: "StoreTransfer/Framework/Base/baseModel",
        baseService: "StoreTransfer/Framework/Base/baseService",
        
       // /*
        //*/
        //utils 
        container: "StoreTransfer/Framework/views/container",
        controlsContainer: "StoreTransfer/Framework/Base/backbone/controlsContainer",
        router: "StoreTransfer/Framework/router",
        converters: "StoreTransfer/Framework/lib/js/converters",
    },
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery","underscore"],
            exports: "Backbone"
        },
        "bootstrap": {
            deps: ["jquery"],
            exports: "Backbone"
        },
        ///*
       
        //*/
    }
} );
///*
define("appGlobal", function( AppArch ) {
    //Load/initialize appArch module and define (empty) global app singleton    
    window.AppArch_Global_Namespace_Reference = window.AppArch_Global_Namespace_Reference || AppArch;
    window.App_Global_Instance_Reference = window.App_Global_Instance_Reference || {};
    return window.App_Global_Instance_Reference;
});
//Load and initialize app entry point "app.js", located in same folder as the hosting html file
require(["appGlobal", "apparch", "underscore"], function (App, AppArch, _ ) {
    require([AppArch.APP_FILE_NAME], function ( projectApp ) {
        _( App ).extend( projectApp );
        App.initialize.call( App );
        App.appStart.call( App );
    });
});
//*/


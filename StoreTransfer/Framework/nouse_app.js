"use strict";
var App = ( function () {
    return {
        initializetedt: function (path, page, businessComponents) {
            require.config({
                // For Phonegap this needs to be "/www/"
                baseUrl: "/",
                paths: {
                    // 3rd party libraries
                    jquery: "StoreTransfer/Framework/lib/js/jquery-1.8.2.min",
                    underscore: "StoreTransfer/Framework/lib/js/underscore",
                    backbone: "StoreTransfer/Framework/lib/js/backbone",
                    text: "StoreTransfer/Framework/lib/js/text",
                    log4js: "StoreTransfer/Framework/lib/js/log4javascript_uncompressed",
                    spin: "StoreTransfer/Framework/lib/js/spin",
                    

                    apparch: "StoreTransfer/Framework/modules/apparch",

                    //Views----
                    container: "StoreTransfer/Framework/views/container",
                    converters: "StoreTransfer/Framework/converters",
                    
                    router: "StoreTransfer/Framework/router",
                    //base classes for component development
                    appComponent: "StoreTransfer/Framework/Base/baseApp",
                    view: "StoreTransfer/Framework/Base/baseView",
                    model: "StoreTransfer/Framework/Base/baseModel",
                    services: "StoreTransfer/Framework/Base/baseService"
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
            });
            
            this.homepage = page;
            this.Services = {
                path: "Services/"
            };
            
            for (var i = 0; i < businessComponents.length; ++i) {
                var split = businessComponents[i].split("/");
                this[split[1]] = {
                    path: split.slice( 0, split.length - 1 ).join( "/" ) + "/"
                };
            }
            var dependencies = ["backbone", "router", "container", "converters"];
            define(dependencies.concat(businessComponents), function(Backbone, Router, Container, Converters) {
                this.router = new Router();
                this.containerView = new Container();
                this.containerView.render();
                this.converters = Converters;

                Backbone.history.start({ root: window.location.pathname, silent: true });
                Backbone.history.start( { root: "", silent: true } );
                for ( var i = dependencies.length; i < arguments.length; ++i ) {
                    arguments[i].initialize();
                }

                this.containerView.setActive(this.homepage);

                this.router.navigate(this.homepage, { trigger: true, replace: true });
            }.bind(this));
        },
        getView: function(path) {
            return this.router.getPage(path);
        },

        path: window.location.pathname.replace("/index.html", "/"),
        router: {},
        containerView: {},
        services: {},
        converters: {}
    };
})(window.App || {});
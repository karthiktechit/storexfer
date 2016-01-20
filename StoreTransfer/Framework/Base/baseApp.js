"use strict";

define( [
   "backbone",
   "underscore",
   "converters",
   "router",
   "container",
   "StoreTransfer/Framework/modules/utils"
],
function ( Backbone, _, Converters, Router, Container, Utils) {
   
    var baseApp = { };
    return _( baseApp ).extend( {
        appStart: function () {
        	//alert('1 in baseapp.js');
            var self = this;
            this.appTitle = this.appTitle === undefined ? "Base Application": this.appTitle;
            this.converters = Converters;
            this.path = window.location.pathname.substr( 0, window.location.pathname.lastIndexOf( "/" ) + 1 );
            this.Services = {
                path: "Services/"
            };
            
            // load global css
            Utils.loadCSS( "StoreTransfer/Framework/lib/css/bootstrap/bootstrap.css" );
            Utils.loadCSS( "StoreTransfer/Framework/lib/css/bootstrap/bootstrap-responsive.css" );
            //Utils.loadCSS( "StoreTransfer/Framework/lib/css/kits/theme.css" );
            Utils.loadCSS( "StoreTransfer/Framework/templates/css/layout.css" );
            //Utils.loadCSS( "StoreTransfer/Framework/lib/css/kits/KITSstyle.css" );
            //init app router 
            this.router = new Router();
            
            //init global app container 
            var containerView = new Container();
            this.containerView = containerView;
            containerView.render();
            Backbone.history.start( { root: window.location.pathname, silent: true } );
            _( this.startupComponents ).each( function ( businessComponent ) {
                containerView.addTab( businessComponent.id, businessComponent.tabLabel );
            });

            //load and initialize business components
            this.homepage = this.businessComponents[0].id;
           // alert('this.homepage::'+this.homepage);
            require( _.pluck( this.businessComponents, "path" ), function () {
                _( arguments ).each( function ( businessComponent ) {
                    businessComponent.App = self;
                    businessComponent.initialize.call( businessComponent );
                    businessComponent.start.call( businessComponent );
                });

                self.containerView.setActive( self.homepage );
                self.router.navigate( self.homepage, { isTopLevel: true });
            });
        },

        getView: function ( path ) {
            return this.router.getPage( path );
        },

        extend: function ( extensionObject ) {
            return _( baseApp ).extend( extensionObject );
        },

        //list of all business components referenced by the app
        businessComponents: [],
        
        //list of business component ids  that show in the home screen (TAB shows if more than one listed)
        startupComponents: [],
        
        //path to app main
        path: "",
        
        //reference to global router instance
        router: {},
        
        //reference to top level view, shows as tabs when more than one business component is loaded
        containerView: {},
        
        //reference to services
        services: {},
        
        //reference to converters
        converters: {},
        
        //custom initialization code. To be overwritten by subclass
        initialize: function () {
        	// Code here...
        	//alert("in baseApp.js");
        }
    } );
} );
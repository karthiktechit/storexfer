"use strict";

define( [
    "require",
    "underscore",
    "appGlobal",
    "StoreTransfer/Framework/modules/utils"
],
function ( require, _ , App, Utils ) {
    //encapsulate common behaviours for  business components
    
    var baseBusinessComponent = {} ;
    return _(baseBusinessComponent).extend( {
        start: function() {
        	//alert("start called from baseBusine comp");
            var self = this;
            //load layout css files global to the business component
            if ( !_.isArray( this.layoutCss ) ) {
                this.layoutCss = [this.layoutCss];
            }     
            _.each( this.layoutCss, function( cssFile ) {
                Utils.loadCSS( cssFile );
            });

            //add page routes
            self.App.router.addPages( this.pages );
        },

        // business component options passed by parent app and/or or calling component
        // can be used to customize behaviour based on hosting app
        options: {},
        
        //reference to parent app
        App: {},
        
        //list of css files global to the component
        layoutCss: [],
        
        //pages/routes for the component
        pages: {},
        
        //custom initialization code will be overwritten in subclass
        initialize : function () {},
        
        //class extennsibility model. leverages underscore model
        extend: function ( extensionObject ) {
            var businessComponent = {};
            return _( businessComponent ).extend( baseBusinessComponent, extensionObject );
        },
    } );
} );
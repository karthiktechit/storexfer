"use strict";

define( [
    "backbone"
],
function ( Backbone ) {
    
    var model = Backbone.Model.extend( {
    	initialize: function () {
        	this.data = "Mani From Backbone";
    	},
        //encapsulates common behaviours common to all top level view models
        triggerChange: function ( attribute, silenceGlobal ) {
            if ( !silenceGlobal ) {
                this.trigger( "change" );
            }
            if ( attribute ) {
                this.trigger( "change:" + attribute );
            }
        },
        setStoreNum : function(){
        	
        },
        getStoreNum : function(){
        	return this.data;
        }
    } );

    return model;
} );
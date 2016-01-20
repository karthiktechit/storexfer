"use strict";

define( [
    "apparch"
],
function ( AppArch ) {
    //Consolidated Calculator Business component definition
    return AppArch.App.extend( {

        appTitle: "Click and Collect",

        //list of all business components referenced by the app
        businessComponents: [ {
            id: "StoreTransfer",
            name: "StoreTransfer",
            path: "StoreTransfer/BusinessComponents/StoreTransfer/www/default",
            options: {}
        }],
        //list of business component ids  that show in the home screen (TAB shows if more than one listed)
        startupComponents: [{
            id: "LMS",
            tabLabel: "StoreMobility"
        }],

        //custom App initialization code
        initialize: function () {
        	
        }
    } );
} );


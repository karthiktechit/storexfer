"use strict";

define( [
  "StoreTransfer/Framework/modules/utils",
  "StoreTransfer/Framework/modules/globals",
   "baseApp",
   "baseBusinessComponent",
   "basePageView",
   "basePageModel",
   "baseService"
],   
function ( utils, globals, baseApp, baseBusinessComponent, basePageView, basePageModel, baseService) {
    // AppArch namespace definition
    return {
                  
        //global constants
        APP_FILE_NAME: "app.js",
        BUSINESS_COMPONENT_FILE_NAME : "default.js",
        
        //base classes for app and business component development
        App: baseApp,
        Service : baseService,
        BusinessComponent : baseBusinessComponent,
        PageView: basePageView,
        PageModel: basePageModel,
        
        // utils and helpers
        //Config : config,
        Utils: utils,
        Globals: globals,
        
        log: function ( message ) {
            console.log( message );
        }
    };
});
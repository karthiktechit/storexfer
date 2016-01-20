"use strict";

define([
    "apparch"
],
function (AppArch) {
    
    return {
    	// switch to appropriate server name. (Defaulted to server running in 80 port)
    	//SAMSServicePath : "http://172.16.120.68/SAMSService/rs/SAMSRestService/",
    	//172.16.120.45
    	SAMSServicePath : "http://157.227.253.166/SAMSService/rs/SAMSRestService/",
    	//SAMSServicePath : "http://172.16.120.74:8082/SAMSService/rs/SAMSRestService/",
    	//SAMSServicePath : "http://157.227.254.217:8082/SAMSService/rs/SAMSRestService/",
    	//SAMSServicePath : "http://163.122.20.12:8082/SAMSService/rs/SAMSRestService/",
        //SAMSServicePath : "http://inchnsirthdapp/SAMSService/rs/SAMSRestService/",
        getBranches : function(success, error){

    		var url = this.SAMSServicePath + "getBranches";
    		 AppArch.Utils.Ajax.Get(url, success, error);
    	},
    	
    	getStores : function(success, error){

    		var url = this.SAMSServicePath + "getStores";
    		 AppArch.Utils.Ajax.Get(url, success, error);
    	},
    	
    	
         
    };
});
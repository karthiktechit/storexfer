"use strict";

define( function () {

    return {
        appName: "StoreTransfer",
        
        baseUrl: "", //host:port
        currentUser: "GBR8657",
        myLocation: "", //Store numbner
        deviceName: "MC75",
        deviceVersion: "2012.9.4.1",
        commonLogUrl: "",

        getServiceUrl: function() {

            return "http://" + this.baseUrl + "/StoreTransfer/rs";
        },

        /*
         * 
         */
        getClientProfile: function() {
            return {
                userId: this.currentUser,
                deviceName: this.deviceName,
                deviceVersion: this.deviceVersion,
                storeNumber: this.myLocation
            };
        },

        parameters: [],
    };

});
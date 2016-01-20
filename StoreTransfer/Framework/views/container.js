"use strict";

define( [
    "jquery",
    "underscore",
    "backbone",
    "appGlobal",
    "converters",
    "text!" + "StoreTransfer/Framework/templates/container.html"
],
function($, _, Backbone, App,Converters, template) {
    return Backbone.View.extend( {
        el: "#container-view",
        events: {

        },
        // initialize template
        template: _.template(template),
        converters: Converters,
        render: function () {
            if ( App === undefined ) {
                App = require("appGlobal");
            }
            // function to render the page.            
            this.$el.html(this.template({title: App.appTitle}));
            $("#usertitle").hide();
            return this;
        },
        unrender: function() {
            this.$el.html("");
        },
        setActive: function(className) {

        },
        
        addTab: function(className, value) {
          
        },
        homePage : function(){
            App.router.navigate("Order_Details", true);       
        }
    });
});
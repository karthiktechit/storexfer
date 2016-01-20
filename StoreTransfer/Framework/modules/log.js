"use strict";

define( [
  "/Framework/config",
  "log4js"
],
function (Config, log4javascript) {
    return {
        logger: null,
        getLogger: function() {
            if (this.logger === undefined || this.logger === null) {
                this.logger = log4javascript.getLogger(Config.appName);
                var ajaxAppender = new log4javascript.AjaxAppender(Config.commonLogUrl);
                var layout = new log4javascript.PatternLayout("[%-5p - %c - %d]  %m");
                //layout example: 
                //[ERROR - IMS_Mobile - 2012-11-26 10:23:53,578] Testing logging layout

                ajaxAppender.setLayout(layout);
                this.logger.addAppender(ajaxAppender);
                this.logger.setLevel(log4javascript.Level.ALL);
            }

            return this.logger;
        },
        prependMessage: function(message) {

            if (console !== undefined)
                console.log(message);

            return "[{0}-{1}-{2}] {3}".format(Config.deviceName, Config.currentUser, Config.myLocation, message);
        },
        Debug: function(message, exception) {
            var m = this.prependMessage(message);

            if (exception !== undefined)
                this.getLogger().debug(m, exception);
            else
                this.getLogger().debug(m);

        },
        Info: function(message, exception) {
            var m = this.prependMessage(message);

            if (exception !== undefined)
                this.getLogger().info(m, exception);
            else
                this.getLogger().info(m);
        },
        Warning: function(message, exception) {
            var m = this.prependMessage(message);

            if (exception !== undefined)
                this.getLogger().warning(m, exception);
            else
                this.getLogger().warning(m);
        },
        Error: function(message, exception) {
            var m = this.prependMessage(message);

            if (exception !== undefined)
                this.getLogger().error(m, exception);
            else
                this.getLogger().error(m);
        },
        Fatal: function(message, exception) {
            var m = this.prependMessage(message);

            if (exception !== undefined)
                this.getLogger().fatel(m, exception);
            else
                this.getLogger().fatel(m);
        }
    };
});
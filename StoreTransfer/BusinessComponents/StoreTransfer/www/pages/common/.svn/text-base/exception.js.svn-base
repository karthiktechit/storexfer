/* global define:false */
/* jshint -W097 */

"use strict";


define(["Framework/modules/log"],
	function (Logger) {

		return {

			/* Exception model object to create instances */
			modelObject: {
				method: "", 	//methodName
				data: "",			//custom thrown error
				message: "",	//javascript thrown error message
			},

			handleException: function (errorFile, errorMethod, errorEvent, exceptionObject) {
				exceptionObject.method = errorMethod;
				if (exceptionObject.data !== errorEvent) {
					exceptionObject.message = errorEvent; /* Log the message only when it is not custom thrown error */
				}
				/* Logging the information using the log4js */
				Logger.error(errorFile, exceptionObject);
			}
		};
	});
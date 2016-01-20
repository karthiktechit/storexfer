"use strict";

define(["jquery", "underscore", "basePageModel", "apparch","../common/navigation",],
	function($, _, PageModel,
		AppArch,Navigation) {

		return PageModel.extend({
			
			initialize: function() {
				this.deliveryDetails = AppArch.Globals.deliveryDetails;
			},
			setNavMenuOptions: function () {
				this.menuActionsList = [];
				this.menuPrintInvreport = [];
				this.menuNavigationList = [];
				
			    this.menuNavigationList = [
					Navigation.options.orderDetails,
					Navigation.options.updateOrders,
					Navigation.options.help,
					Navigation.options.exitSmartApp,
				 ];
			},
			onSuccessalert: function(data) {
				alert("Success from Authentication service - model");
				// this.setBranchList(data.branchDetails);
			},
			onErroralert: function(data) {
				alert("first calling Error in Processing data!");
			}
		});
	});
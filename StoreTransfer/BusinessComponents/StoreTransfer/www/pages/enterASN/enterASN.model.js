"use strict";

define(["jquery", "underscore", "basePageModel", "apparch","../common/navigation",],
	function($, _, PageModel,
		AppArch,Navigation) {

		return PageModel.extend({
			
			initialize: function() {
				
				AppArch.Globals.setOrderDetails();
				AppArch.Globals.setDeliveryDetails();
				this.enteredASN = "";
			},
			setNavMenuOptions: function () {
				this.menuActionsList = [];
				this.menuPrintInvreport = [];
				this.menuNavigationList = [];
				this.menuActionsList = [
					Navigation.options.collapseAll,
				];

			    this.menuNavigationList = [
					Navigation.options.orderDetails,
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

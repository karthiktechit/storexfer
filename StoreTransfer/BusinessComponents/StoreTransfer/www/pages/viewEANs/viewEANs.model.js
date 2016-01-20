"use strict";

define(["jquery", "converters", "basePageModel", "underscore","apparch","../common/navigation", ],
	function($, Converters, PageModel, _,
		AppArch,Navigation) {

		return PageModel.extend({
			
			initialize: function() {

				//AppArch.Globals.setOrderDetails();

				this.enteredEAN = "";
				this.enteredEANDescription = "";
				this.showFilterItems = false;
				this.enteredASN = AppArch.Globals.selectedOrderID;
				this.ordersList = AppArch.Globals.orderDetails;
				this.masterData = AppArch.Globals.orderDetails;				
				this.isEANValid = true;
				this.modifiedOrders = [];
			},

			setNavMenuOptions: function () {
				this.menuActionsList = [];
				this.menuPrintInvreport = [];
				this.menuNavigationList = [];
				this.menuActionsList = [
					Navigation.options.allocateOrders,
					Navigation.options.clearFilters,					
					Navigation.options.filterSmartList
				];

			    this.menuNavigationList = [
					Navigation.options.orderDetails,
					Navigation.options.completeOrders,
					Navigation.options.help,
					Navigation.options.exitSmartApp
				];
				
				this.filterList = [
					{
						category: "All",
						id: "all",
						//filterCode: 0
					}, {
						category: "Allocated",
						id: "allocated",
						//filterCode: 1
					}, {
						category: "Partially Allocated",
						id: "partiallyAllocated",
						//filterCode: 2
					}, {
						category: "Yet to Allocate",
						id: "yetToAllocate",
						//filterCode: 3
					}
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

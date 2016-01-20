"use strict";

define(["jquery", "underscore", "basePageModel", "apparch","../common/converters", "../common/navigation", "StoreTransfer/Framework/modules/globals"],
	function($, _, PageModel,
		AppArch, convertors,Navigation, Globals) {

		return PageModel.extend({

			initialize: function() {
				var orderDetails = [];
			//	Globals.setOrderDetails();
				this.orderData = Globals.orderDetails;
				this.showFilter = 'hide';
				this.filteredOrderList = this.orderData;
				this.filterData = false;
			},
			setNavMenuOptions: function() {
				this.menuActionsList = [];
				this.menuPrintInvreport = [];
				this.menuNavigationList = [];
				var allItem,partiallyFilled,fullyFilled,notStarted ;
				this.filterList = [];
				this.filterList = [{
					category: "All",
					id: "allItem",
					value: allItem,
					filterCode: 0
				}, {
					category: "Partially Filled EANs",
					id: "partiallyFilled",
					value: partiallyFilled,
					filterCode: 1
				}, {
					category: "Fully Filled EANs",
					id: "fullyFilled",
					value: fullyFilled,
					filterCode: 2
				}, {
					category: "Not Started",
					id: "notStarted",
					value: notStarted,
					filterCode: 3
				}];
				this.menuActionsList = [
					Navigation.options.expandAll,
					Navigation.options.collapseAll,
					Navigation.options.filterSmartList
				];

				this.menuNavigationList = [
					Navigation.options.updateOrders,
					Navigation.options.help,
					Navigation.options.exitSmartApp,
				];
				
						
				
			},
			setSortData: function(filterCode) {
				var allItem = [];
				var partiallyFilled = [];
				var fullyFilled = [];
				var notStarted = [];
				var filteredOrder = [];
				_.each(this.orderData, function(order) {
					var eanFilteredList = [];
					var currentOrder = jQuery.extend(true, {}, order);
					switch (filterCode) {
						case 0:
							eanFilteredList = _.filter(currentOrder.eanList, function(ean) {
								return (ean != null);
							});
							break;
						case 1:
							eanFilteredList = _.filter(currentOrder.eanList, function(ean) {
								return (ean.allocatedQty < ean.expectedQty);
							});
							break;
						case 2:
							eanFilteredList = _.filter(currentOrder.eanList, function(ean) {
								return (ean.allocatedQty == ean.expectedQty);
							});
							break;
						case 3:
							eanFilteredList = _.filter(currentOrder.eanList, function(ean) {
								return (ean.allocatedQty == 0);
							});
							break;
					}
					currentOrder.eanList = [];
					if (eanFilteredList.length > 0) {
						currentOrder.eanList = eanFilteredList;
						filteredOrder.push(order);
					}
				});
				this.filteredOrderList = filteredOrder;
			},
			onErroralert: function(data) {

			}
		});
	});
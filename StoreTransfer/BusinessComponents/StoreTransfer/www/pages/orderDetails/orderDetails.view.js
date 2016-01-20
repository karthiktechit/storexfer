"use strict";
define(
	["require", "apparch", "appGlobal",
		"./orderDetails.model",
		"text!" + "./orderDetails.html",
		"text!../sharedtemplate/menutemplate.html",
		"../common/smartlistUtil",
		"../common/UIConstants",
		"StoreTransfer/Framework/modules/globals"
	],
	function(require, AppArch, App, Model, template, MenuTemplate, SmartListUtil, UIConstants,Globals) {

		return AppArch.PageView
			.extend({

				swHeaderel: "#sw-top-header",
				title: "#pagetitle",
				viewrequire: require,
				initialize: function() {
					this.model = new Model();
				},
				events: {
					"click #viewEAN": "viewEAN",
					"click #filterSmartList": "filterClicked",
					'click #expandAll': "expandAll",
					'click #collapseAll': "collapseAll",
					'click #allItem,#partiallyFilled,#fullyFilled,#notStarted': "filterOrderData",
					"click .rightArrow": "onImageClicked",
					"click .scrollToTop": "scrollToTop",
					"click #completeOrders" : "completeOrdersClicked"
				},
				render: function(modelObj) {
					if(!this.model.filterData){
						this.model.filteredOrderList = Globals.orderDetails;	
					}
					this.renderTemplate({
						element: this.el,
						template: template
					});
					this.renderMenu(modelObj);
					$('#appContainer').addClass('navigationMenu smartListApp');
					SmartListUtil.setSmartListApp("tasklist", UIConstants.SMARTLISTTITLE);
					this.scroll = new IScroll('#pageScrollHelper', {
						fadeScrollbars: false,
						scrollbars: true,
						bounce: false,
						tap: true
					});
					this.scroll.on('scrollEnd', this.scrollTophandler);
					$(".scrollToTop").css("visibility", "hidden");
					SmartListUtil.removePops();
				},
				renderMenu: function(modelObj) {

					this.model.setNavMenuOptions();
					this.renderTemplate({
						element: '#sidebar',
						template: MenuTemplate,
						renderOptions: {
							view: this,
							model: modelObj
						}
					});
					this.menuScroll = new IScroll('#sidebarWrapper', {
						scrollbars: true,
						fadeScrollbars: false
					});
				},
				scrollTophandler: function() {
					if (this.y < -1000) {
						$(".scrollToTop").css("visibility", "visible");
					} else {
						$(".scrollToTop").css("visibility", "hidden");
					}
				},
				onImageClicked: function(e) {
					var imgId = e.target.id;
					var customerListId = "customerList" + imgId.match(/[0-9]+/g)[0];
					var orderId = "order" + imgId.match(/[0-9]+/g)[0];
					if ($('#' + imgId).hasClass('right')) {
						$('#' + imgId).removeClass('right');
						$('#' + imgId).addClass('down');
						$("#" + customerListId).show();
						$('#' + orderId).removeClass('collapseOrder');
						$('#' + orderId).addClass('expandOrder');

					} else {
						if ($('#' + imgId).hasClass('down')) {
							$('#' + imgId).removeClass('down');
							$('#' + imgId).addClass('right');
							$('#' + orderId).removeClass('expandOrder');
							$('#' + orderId).addClass('collapseOrder');
							$("#" + customerListId).hide();
						} else {
							$('#' + imgId).addClass('down');
							$('#' + orderId).removeClass('collapseOrder');
							$('#' + orderId).addClass('expandOrder');
							$("#" + customerListId).show();
						}
					}
					this.scroll.refresh();
				},
				load: function() {
					alert("loaded");
				},
				viewEAN: function() {
					App.router.navigate('ViewEANs_View');
				},
				filterClicked: function(e) {
					var isExpanded = $('.filterList').hasClass("hide");
					this.model.showFilter = (!isExpanded) ? 'hide' : '';
					this.renderMenu();
				},
				expandAll: function() {
					$('.rightArrow').removeClass('right');
					$('.rightArrow').addClass('down');
					$('.customerList').show();
					$('.orderItem').removeClass('collapseOrder');
					$('.orderItem').addClass('expandOrder');
					this.scroll.refresh();
					SmartListUtil.closeMenuBar();
				},
				collapseAll: function() {
					$('.rightArrow').removeClass('down');
					$('.rightArrow').addClass('right');
					$('.customerList').hide();
					$('.orderItem').removeClass('expandOrder');
					$('.orderItem').addClass('collapseOrder');
					this.scroll.refresh();
					SmartListUtil.closeMenuBar();
				},
				filterOrderData: function(event) {
					this.model.filterData = true;
					var filterCode = $(event.currentTarget).data("filter");
					this.model.setSortData(filterCode);
					SmartListUtil.closeMenuBar();
					this.scroll.refresh();
					this.render();
					this.model.filterData = false;
				},
				scrollToTop: function() {
					view.scroll.scrollTo(0, 0, 1000, IScroll.utils.ease.circular);
				},
				completeOrdersClicked: function(){
					App.router.navigate('Complete_View');
				},
			});
	});
"use strict";
define(
	["require", "apparch", "appGlobal",
		"./complete.model",
		"text!" + "./complete.html",
		"text!../sharedtemplate/menutemplate.html",
		"../common/smartlistUtil",
		"../common/UIConstants"
	],
	function(require, AppArch, App, Model, template, MenuTemplate, SmartListUtil, UIConstants) {

		return AppArch.PageView
			.extend({

				swHeaderel: "#sw-top-header",
				title: "#pagetitle",
				viewrequire: require,
				initialize: function() {
					this.model = new Model();					
				},
				events: {
					"click #viewOrders" : "viewOrdersClicked",
					"click #orderDetails" : "viewOrdersClicked",
					"click #updateOrders" : "updateOrdersClicked"
				},

				renderMenu: function (modelObj) {
				
					this.model.setNavMenuOptions();
					this.renderTemplate({
						element: '#sidebar',
						template: MenuTemplate,
						renderOptions: {
							view: this,
							model: modelObj
						}
					});
					/*this.menuScroll = new IScroll('#sidebarWrapper', {
						scrollbars: true,
						fadeScrollbars: false
					});*/
				},

				render: function(modelObj) {
					this.renderTemplate({
						element: this.el,
						template: template
					});
					this.renderMenu(modelObj);
					$('.appContainer').addClass('navigationMenu smartListApp');
					SmartListUtil.setSmartListApp("tasklist", UIConstants.SMARTLISTTITLE);

					return this;
				},

				load: function() {
					
				},

				viewOrdersClicked: function(){
					App.router.navigate('Order_Details');									
				},

				updateOrdersClicked: function(){
					App.router.navigate('ViewEANs_View');									
				}				
			});
	});
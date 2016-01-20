"use strict";
define(
	["require", "apparch", "appGlobal",
		"./enterASN.model",
		"text!" + "./enterASN.html",
		"text!../sharedtemplate/menutemplate.html",
		"../common/smartlistUtil",
		"../common/UIConstants"
	],
	function(require, AppArch, App, EnterASNModel, template, MenuTemplate, SmartListUtil, UIConstants) {

		return AppArch.PageView
			.extend({

				swHeaderel: "#sw-top-header",
				title: "#pagetitle",
				viewrequire: require,
				initialize: function() {
					this.model = new EnterASNModel();
					this.render();
				},
				events: {
					"click #submitASN" : "submitASNClicked",
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

					$('#errorFieldDiv').hide();

					return this;
				},

				load: function() {
					
				},

				submitASNClicked: function(){
					var enteredASN = $('#inputASN').val();
					var validASN = false;
					if(enteredASN != null && enteredASN != "") {

						_.each(AppArch.Globals.deliveryDetails, function(deliveryObject) {															
							if(deliveryObject.deliveryId === parseInt(enteredASN)){
								validASN = true;
							}
						});

						if(validASN){
							this.model.enteredASN = enteredASN;
							App.router.navigate('Order_Details');
							AppArch.Globals.setSelectedOrderID(parseInt(enteredASN));
						} else {
							$('#errorFieldDiv').show();
							$('#errorFieldDiv').addClass('invalidFieldLayout');
							$('#errorMessage').append('Please enter a valid ASN.');							
						}
					}				
				}
				
			});
	});

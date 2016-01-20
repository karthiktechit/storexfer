"use strict";
define(
	["jquery", "require", "apparch", "appGlobal",
		"./viewEANs.model",
		"text!" + "./viewEANs.html",
		"text!../sharedtemplate/menutemplate.html",
		"../common/smartlistUtil",
		"../common/UIConstants",		
	],
	function($, require, AppArch, App, Model, template, MenuTemplate, SmartListUtil, UIConstants) {

		return AppArch.PageView
			.extend({

				swHeaderel: "#sw-top-header",
				title: "#pagetitle",
				viewrequire: require,
				initialize: function() {
					this.model = new Model();
					this.model.enteredASN = AppArch.Globals.selectedOrderID;				
				},
				events: {
					"click #searchEAN" : "searchByEANClicked",
					"click #clearEAN" : "clearEANClicked",
					"click #allocateBtn" : "allocateBtnClicked",
					"click #clearFilters" : "clearEANClicked",
					"change .quantityText" : "orderDataChanged",
					"click #all" : "filterOptionAllClicked",
					"click #allocated" : "filterOptionAllocatedClicked",
					"click #partiallyAllocated" : "filterOptionPartiallyAllocatedClicked",
					"click #yetToAllocate" : "filterOptionYetToAllocateClicked",
					"click #orderDetails" : "orderDetailsClicked",
					"click #allocateOrdersAction" : "allocateBtnClicked"				       			
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
					/*$('#inputEAN').autocomplete({
			            source: this.model.eans
			        });*/

			        $('#searchFieldDiv').hide();
			        $('#searchFieldDiv').removeClass('searchFieldLayout');

					$('.appContainer').addClass('navigationMenu smartListApp');
					SmartListUtil.setSmartListApp("tasklist", UIConstants.SMARTLISTTITLE);

					$('#inputEAN').val(this.model.enteredEAN);
					if(this.model.isEANValid){
						if(this.model.enteredEAN != null && this.model.enteredEAN !== ""){
							$('#searchFieldDiv').show();
							$('#searchFieldDiv').addClass('searchFieldLayout');
							$('#eanDescription').append(this.model.enteredEAN +' : '+this.model.enteredEANDescription);	
						} else {
							$('#searchFieldDiv').hide();
							$('#searchFieldDiv').removeClass('searchFieldLayout');
							$('#searchFieldDiv').removeClass('invalidFieldLayout');
						}
					} else{
						$('#searchFieldDiv').show();
						$('#searchFieldDiv').addClass('invalidFieldLayout');
						$('#eanDescription').append('Please enter a valid EAN.');
						this.model.isEANValid = true;
					}
					return this;
				},
				
				load: function() {
					
				},				

				searchByEANClicked: function(){
					var enteredEAN = $('#inputEAN').val();
					this.model.isEANValid = false;
					var viewEANsInstance = this;

					if(enteredEAN != null && enteredEAN != "") {												
						
						this.model.enteredEAN = enteredEAN;
						
						var ordersFilteredByEAN = [];
						var validEAN = false;
						var itemsList =[];

						_.each(AppArch.Globals.orderDetails, function(orderObject) {
							itemsList =[];
							_.each(orderObject.eanList, function(itemObject) {	
								if(itemObject.eanId === parseInt(enteredEAN)){
									validEAN = true;
									viewEANsInstance.model.enteredEANDescription = itemObject.eanDesc; 
									itemsList.push(itemObject);
									
								}
							});
							if(itemsList.length > 0){
								orderObject.eanList = itemsList;
								ordersFilteredByEAN.push(orderObject);
							}
						});

						this.model.ordersList = ordersFilteredByEAN;
						this.model.isEANValid = validEAN;										
					} else {						
						this.model.enteredEAN = "";	
						this.model.isEANValid = true;				
						this.model.ordersList = AppArch.Globals.orderDetails;						
					}
					this.renderList();
					this.render();									
				},

				clearEANClicked: function(){					
					this.model.enteredEAN = "";					
					this.model.ordersList = AppArch.Globals.orderDetails;
					this.renderList();
					this.render();
				},

				renderList: function(){					
					this.renderTemplate({
						element: this.el,
						template: template
					});																							
				},

				allocateBtnClicked: function(){
					var viewEANsInstance = this;
					
					_.each(viewEANsInstance.model.modifiedOrders, function(modifiedOrderObject) {
						_.each(modifiedOrderObject.eanList, function(modifiedItemObject) {
							_.each(viewEANsInstance.model.ordersList, function(masterOrderObject) {
								if(masterOrderObject.id === parseInt(modifiedOrderObject.id)){
									_.each(masterOrderObject.eanList, function(masterItemObject) {
										if(masterItemObject.eanId === parseInt(modifiedItemObject.eanId)){
											if(modifiedItemObject.allocatedQty !== null && 
												modifiedItemObject.allocatedQty !== ""){
												masterItemObject.allocatedQty = parseInt(modifiedItemObject.allocatedQty);
											} else {
												masterItemObject.allocatedQty = modifiedItemObject.allocatedQty;
											}	
										}
									});
								}								
							});
						});
					});

					_.each(viewEANsInstance.model.modifiedOrders, function(modifiedOrderObject) {
						_.each(modifiedOrderObject.eanList, function(modifiedItemObject) {
							_.each(AppArch.Globals.orderDetails, function(masterOrderObject) {
								if(masterOrderObject.id === parseInt(modifiedOrderObject.id)){
									_.each(masterOrderObject.eanList, function(masterItemObject) {
										if(masterItemObject.eanId === parseInt(modifiedItemObject.eanId)){
											if(modifiedItemObject.allocatedQty !== null && 
												modifiedItemObject.allocatedQty !== ""){
												masterItemObject.allocatedQty = parseInt(modifiedItemObject.allocatedQty);
											} else {
												masterItemObject.allocatedQty = modifiedItemObject.allocatedQty;
											}	
										}
									});
								}								
							});
						});
					});
					
					//this.model.ordersList = [];
					//this.model.ordersList = updatedMasterData;
					viewEANsInstance.renderList();
					viewEANsInstance.render();
				},

				orderDataChanged: function(e){
					var inputFieldId = e.target.id;
					var orderId = inputFieldId.split("_")[0];
					var itemId = inputFieldId.split("_")[1];

					var quantity = $('#'+inputFieldId).val();
					
					var modifiedOrders = this.model.modifiedOrders;					
					var itemsList =[];

					_.each(AppArch.Globals.orderDetails, function(orderObject) {						
						if(orderObject.id === parseInt(orderId)){
							itemsList =[];
							_.each(orderObject.eanList, function(itemObject) {
								if(itemObject.eanId === parseInt(itemId)){									
									itemObject.allocatedQty = quantity;
									itemsList.push(itemObject);									
								}
							});
							if(itemsList.length > 0){
								orderObject.eanList = itemsList;
								modifiedOrders.push(orderObject);
							}
						}												
					});

					this.model.modifiedOrders = modifiedOrders;
				},

				filterOptionAllClicked: function(){					
					this.model.ordersList = this.filterOrders(0);							
					this.render();
				},

				filterOptionAllocatedClicked: function(){					
					this.model.ordersList = this.filterOrders(1);							
					this.render();
				},

				filterOptionPartiallyAllocatedClicked: function(){					
					this.model.ordersList = this.filterOrders(2);							
					this.render();
				},

				filterOptionYetToAllocateClicked: function(){					
					this.model.ordersList = this.filterOrders(3);							
					this.render();
				},

				filterOrders: function(fiterOption){

					var filteredData = [];
					var itemsList =[];
					var order = {};
					var eanApplied = false;
					var eanEntered = this.model.enteredEAN;
					if( eanEntered !== null && eanEntered !== ""){
						eanApplied = true;	
					}
					
					_.each(AppArch.Globals.orderDetails, function(orderObject) {
						order = {};
						itemsList = [];						
						_.each(orderObject.eanList, function(itemObject) {
							if(fiterOption === 0){
								if((eanApplied && itemObject.eanId === parseInt(eanEntered)) || !eanApplied){
									itemsList.push(itemObject);									
								}														
							}else if((fiterOption === 1) && (itemObject.expectedQty === itemObject.allocatedQty)){
								if((eanApplied && itemObject.eanId === parseInt(eanEntered)) || !eanApplied){
									itemsList.push(itemObject);									
								}														
							} else if ((fiterOption === 3) && (itemObject.allocatedQty === 0)){
								if((eanApplied && itemObject.eanId === parseInt(eanEntered)) || !eanApplied){
									itemsList.push(itemObject);
								}
							} else if ((fiterOption === 2) && (itemObject.allocatedQty > 0) &&
								(itemObject.expectedQty !== itemObject.allocatedQty)){
								if((eanApplied && itemObject.eanId === parseInt(eanEntered)) || !eanApplied){
									itemsList.push(itemObject);
								}
							}
						});
						if(itemsList.length > 0){
							order = orderObject;
							order.eanList = itemsList;
							filteredData.push(order);
						}												
					});

					return filteredData;
				},

				orderDetailsClicked: function(){
					App.router.navigate('Order_Details');
				}

			});
	});

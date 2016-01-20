"use strict";

/*
 * This mimics the functionality in the C# client application.
 * Data shared among all workflows
 */
define(function() {
    return {
        //varName: value,
         deliveryDetails:[],
         orderDetails:[],
         selectedOrderID: 0,

         setDeliveryDetails: function(){
            this.deliveryDetails = [
            {
                id:1,
                deliveryId: 2345689,
                deliveryFrom: "Screwfix",
                dueInDate: "12/24/2014",
                deliveryType: "Transfer",
                orders: this.orderDetails
            }];
         },

         setOrderDetails: function(){
         	this.orderDetails = [
         	{
         		id:1,
         		customerName:"William Hanks",
         		orderId:225556668,
         		eanList : [{
         			eanId:755688984,
         			expectedQty: 12,
         			eanDesc:"B&Q MATT WHITE PAINT 2.0 LTS",
         			allocatedQty:12
         		}]
         	},
         	{
         		id:2,
         		customerName:"Kevin Woods",
         		orderId:256598558,
         		eanList : [{
         			eanId:548658655,
         			expectedQty:7,
         			eanDesc:"B&Q CARDBOARD 5 SQFT",
         			allocatedQty:0
         		}]
         	},
            {
            	id:3,
                customerName:"Thomas King",
                orderId:256598558,
                eanList : [{
                    eanId:266766766,
                    expectedQty:8,
                    eanDesc:"THISTLE HARDWALL PLASTER",
                    allocatedQty:0
                }]
            },
            {
                id:4,
                customerName:"Mark Wilder",
                orderId:256598558,
                eanList : [{
                    eanId:234353335,
                    expectedQty:1,
                    eanDesc:"GYPROC WALLBOARD",
                    allocatedQty:1
                }]
            },
            {
                id:5,
                customerName:"Tom Reacher",
                orderId:256598558,
                eanList : [{
                    eanId:234353335,
                    expectedQty:5,
                    eanDesc:"GYPROC WALLBOARD",
                    allocatedQty:2
                }]
            }];         	
         },

         setSelectedOrderID: function(orderID){
            this.selectedOrderID = orderID;
         }
    };
});

/* global define:false */
/* jshint -W097 */

"use strict";

/*
 * This mimics the functionality in the C# client Resource file.
 * Data shared among all SmartList Workflow's
 */

define([
		
	],
	function () {
		return {

			/* Page title */
			SMARTLISTTITLE: "Smart List",
			SMARTSUMMARYTITLE: "Smart List Summary",
			MISSEDSCANSTITLE: "Missed Scans",

			/* Numeric Constants */
			ISAL_CODE: 11,
			PRINT_TASK_CODE: 170,
			SALVAGE_TASK_CODE: 171,
			CLEARANCE_SKU: 500,
			REDUCED_TAG_PREFIX: "9821",

			/* Generic Constants  */
			YES: "Y",
			NO: "N",
			SUCCESS: "SUCCESS",
			FAIL: "FAIL",
			ERROR: "ERROR",
			REDUCED_TAG_SCAN: "reduced-tag-identifier-scan",
			ISAL_DESC: "RTag",
			ISAL_SUB_DESC: "ReducedTag",
			SALVAGE: "salvage",
			MULTIPLE_VENDORUPC: "vendorupc",
			PRINT: "print",
			ISAL: "isal",
			SKU_SCAN: "item-sku-scan",
			TASK_LIST: "taskList",
			VERIFYOHPAGE: "verifyOnHands",
			OPTIONALACTIONSPAGE: "optionalActions",
			LABELCOLOR_YELLOW: "Y",
			LABELMODE: "R",
			PRINTMODE_SPOOL: "SPOOL",
			PRINTMODE_IMMEDIATE: "immediate",
			PRINTINVENTORY_FAILURE: "PRINT FAILURE",
            TASKS_CONTROL: "tasks.control",
            REDUCEDTAG_CONTROL: "reducedtagtask.control",
            CARHOST_ERROR: "Error occurred while Working on CAR/HOST Popup .",
            REQUESTMORE_ERROR: "Error occurred while working Request More optional action.",
            REDUCEDTAG_ERROR: "Error occurred while Working Reduced tag task.",
            PRINTER: "Printer",
            SIGNAGE: "Signage",
            STOCK: "Stock",
            
            /* Constants for Labels and Messages used in HTML  */
            OPTIONAL_ACTIONS: "Optional Actions:",
            CURRENT_ON_HANDS: "Current On hands:",
            MISSED_SCAN: "Review Missed Scan",
            MISSED_SCAN_MESSAGE: "Perform Shelf Maintenance as needed",
            PACKDOWN: "Review Shelf Availability",
            PACKDOWN_MESSAGE: "Confirm Product is Packed Down",
            CLEARANCE_ITEM: "Review Clearance Item",
            CLEARANCE_ITEM_MESSAGE: "Ensure product is properly merchandised.",
            OVERSTOCK_ITEM: "Review Overstocked Item",
            OVERSTOCK_ITEM_MESSAGE: "Identify potential opportunities to merchandise item in additional areas.",
            PARTNER_WITH_AP: "Review Potential Shrink",
            PARTNER_WITH_AP_UPPER_MESSAGE: "SKU has had multiple OH <br> changes.",
            PARTNER_WITH_AP_LOWER_MESSAGE: "Identify root cause and take appropriate action.",
            PARTNER_WITH_MET: "Review Price Change",
            PARTNER_WITH_MET_UPPER_MESSAGE: "Price change auto accepted last week and the count was not performed.",
            PARTNER_WITH_MET_LOWER_MESSAGE: "Partner with MET Supervisor to take corrective measures.",
            REQUEST_MORE: "Request More",
            PO_FOLLOWUP: "PO Follow Up",
            INCREASE_TEI: "Increase TEI",
            PRINT_REPRINT_LABEL: "Print/Reprint Label",
            VERIFY_ONHANDS: "Verify On Hands",
            CURRENT_OH: "Current OH:",
            LAST_RECEIVED: "Last Received:",
            OH_ADJUST_LOG: "OH Adj Log",
            PACK_SIZE: "Pack Size:",
            LOCATION: "Location",
            COUNT: "Enter Count:",
            SERVICE_DESK: "Service Desk / Other",
            SERVICE_QTY: "Service Qty:",
            PICKED_QTY: "Picked Qty:",
            NEW_AVAILABLE_OH: "New Available OH:",
            ORDER: "Order #: ",
            DUE_DATE: "Due Date: ",
            SHIP_DATE: "Ship Date: ",
            QUANTITY_ON_ORDER: "Quantity on Order",
            ON_HAND: "On Hand:",
            AVG_SALES_WEEK: "Avg Sales Per Week:",
            CURRENT_WOS: "Current WOS:",
            CURRENT_TEI: "Current TEI",
            NEXT_REVIEW: "Next Review:",
            WOS: "WOS:",
            CONFIRMED_ON_ORDER: "Confirmed On Order:",
            PENDING_ON_ORDER: "Pending On Order:",
            OPEN_CARHOST_REQUEST: "Open CAR/HOST Rqst: ",
            TOTAL_ON_ORDER: "Total On Order:",
            NEW_OO_WITH_REQUEST: "New OO with Request:",
            NEW_WOS_WITH_REQUEST: "New WOS with Request:",
            MULTIPLE_VENDORS: "Multiple Vendors Found",
            STATUS: "Status :",
            VENDOR: "vendor#",
            PART: "Part#",
            MULTIPLE_UPCS: "Multiple UPCs Found",
            REPORT_TYPE: "Report Type:",
            DEPT_PHYSICAL_INVENTORY: "Dept Physical Inventory",
            SELECT_PRINTER: "Select Printer",
            SKU: "SKU #:",
            TOTAL_MD: "Total MD :",
            WAS: "WAS $",
            NOW: "New Now $",
            
            
            
            

			/* To Store Printer List  */
			SPOOL_PRINTERLIST: [],

			/* Scan Messages */
			ScanMsg: {
				INVALID_REDUCEDTAG: "Invalid Reduced Tag",
				INVALID_BARCODE: "Invalid Barcode Scanned",
				INVALID_ITEM: "Invalid Item Scanned",
			},

			SPOOL_SUCCESS_MESSAGE: "Label has been sent to the Spooler.",
			PRINT_SUCCESS_MESSAGE: "Label has been sent to the Printer.",
			PRINTINVENTORY_SUCCESS: "Inventory Report has been printed Successfully.",

			ReducedTagMsg: {
				HAZMAT_MESSAGE: "By proceeding you acknowledge that all fuels and batteries have been removed and all Hazardous items will be processed using HHM procedures.",
				SALVAGE_SUCCESS: "Worked successfully. Remove item from sales floor and place immediately in ZMA bin.",
				SALVAGE_FAILURE: "Salvage unsuccessful.Kindly salvage the item after sometime.",
				PRINT_SUCCESS: "Reduced Tag Label has been sent to the Printer.",
				PRINT_FAILURE: "Print unsuccessful.Kindly print the task after sometime.",
			},

			ReducedTagSalvageMsg: function (arg) {
				return "Total Markdown : $ " + arg + ", Do you want to continue?";
			},

			/* Format Reduced Tag */
			getFormattedReducedTag: function (arg) {
				return this.REDUCED_TAG_PREFIX + arg;
			},
            
            carHostCancelMessage: function (arg) {
                return "Do You want to cancel this CAR/HOST for " + arg + " units?";
            },
            
            changeOnHandsMessage: function (arg) {
                return "Do you want to change the OH value to " + arg + "?";
            },
            
            confirmOnHandsMessage: function (arg) {
                return "Do you want to confirm OH are " + arg + "?";
            }
		};
	});
/* global $:false, define:false */
/* jshint -W097,-W064 */

"use strict";

define([
		//"text!../views/sharedtemplate/popuptemplate.html",
		"./hammer",
		"./UIConstants"
	],
	function ( Hammer, Constants) {

		var closeMenuBar = function () {
			$(".navigationMenu").removeClass("open-sidebar");
			$('.main-content').css("opacity", 1);
			$('.navigationMenuBackdrop').remove();
		};

		var openMenuBar = function () {
			$(".navigationMenu").addClass("open-sidebar");
			$("#sidebar").css("left", 0);
			$("#sidebar").show();
			$('.main-content').css("opacity", 0.5);
			if (!$(".fpControlsPopup-background").hasClass("navigationMenuBackdrop")) {
				$("#sidebar").before($('<div class="navigationMenuBackdrop fpControlsPopup-background"></div>'));
			}
		};

		var backPageTransition = function (sum) {
			$("#sidebar").css("left", sum);
			var trans = 0.5 + parseFloat(Math.abs(sum) / 700);
			$('.main-content').css("opacity", trans);
		};

		return {

			/* Changing the appearance of the SmartList page */
			setSmartListApp: function (pageName, pageTitle) {
				/* Removing title bar and nav tabs */
				$(".title-bar, #fp-action-bar").addClass('hide');
				$(".tabbable.tabs-below").css("height", "130%");

				/* Fetching page title and displaying in title bar */
				$(".application-title").text(pageTitle);
				/* Adding the Menu icon & DeptNbr to Page title */
				if (pageName == "tasklist" || pageName == "taskSummary" || pageName == "heatmaps" || pageName == "missedScans") {

					$(".application-title").before($('<span class="navMenuBarIcon"><a class="navMenubar pull-left" href="#" data-toggle=".navigationMenu"><span class="menu-icon menuBarImage"></span></a></span>'));

					var canOpenMenu = false;
					Hammer($('.main-content')[0]).on("dragright", function (event) {
						if (event.gesture.startEvent.center.clientX < 40) {
							canOpenMenu = true;
							$(".navigationMenu").addClass("open-sidebar");
							var sum = -320 + event.gesture.deltaX;
							var left = $("#sidebar").css("left");
							if (parseInt(left) <= 0) {
								backPageTransition(sum);
							}
							if (event.gesture.deltaX >= 320) {
								openMenuBar();
							}
						}
					});

					Hammer($('.main-content')[0]).on("release", function () {
						if (canOpenMenu) {
							canOpenMenu = false;
							var left = $("#sidebar").css("left");
							if (parseInt(left) < -175) {
								closeMenuBar();
							} else {
								openMenuBar();
							}
						}
					});

					Hammer($('#sidebar')[0]).on("dragleft", function (event) {
						if (event.gesture.startEvent.center.clientX < 500) {
							var sum = event.gesture.deltaX;
							var left = $("#sidebar").css("left");
							if (parseInt(left) <= 0) {
								backPageTransition(sum);
								if (parseInt(left) <= -320) {
									closeMenuBar();
								}
							}
						}
					});

					Hammer($('#sidebar')[0]).on("release", function () {
						var left = $("#sidebar").css("left");
						if (parseInt(left) < -175) {
							closeMenuBar();
						} else {
							openMenuBar();
						}
					});

				} else { /* Showing back button image */
					$(".application-title").before($('<span class="navMenuBarIcon"><a class="backMenu" data-toggle=".navigationMenu"><span class="backBar backImage"></span></a></span>'));
					$(".application-title").addClass("backBar");
				}

				/* Unbinding the earlier binded events */
				$(".navMenubar").off("click");
				$(".backMenu").off("click");

				/* Binding the Navigation menu events */
				$(".navMenubar").on("click", function (event) {
					var toggle_el = $(event.currentTarget).data("toggle");
					$(toggle_el).toggleClass("open-sidebar");
					$("#sidebar").css("left", 0);
					if ($(toggle_el).hasClass("open-sidebar")) {
						$("#sidebar").before($('<div class="navigationMenuBackdrop fpControlsPopup-background"> </div>'));
						$('.main-content').css("opacity", 0.5);
					} else {
						$('.navigationMenuBackdrop').remove();
						$('.main-content').css("opacity", 1);
					}
					/* Hiding the expanded menu lists on closing sidebar */
					$(".deptList, .filterList").addClass("hide");
				});

				/* Delegating an event to the dynamically added element */
				$(".navigationMenu").on("click", ".navigationMenuBackdrop", function () {
					closeMenuBar();
				});
			},

			/* Exiting SmartList app would revert back the normal CSS properties */
			exitSmartListApp: function () {
				sessionStorage.clear(); /* Clearing session object */
				$(".title-bar, #fp-action-bar").removeClass('hide');
				$(".tabbable.tabs-below").css("height", "79%");
				$(".appTitle").remove();
				$('.navigationMenuBackdrop').remove();
			},

			/* SmartList Scanner Notification Box */
			scanPopupMessage: function (viewObj, modelObj) {
				viewObj.model = modelObj;
				viewObj.showPopup({
					template: PopupTemplate,
					pageTitle: "Notification",
					renderOptions: {
						model: modelObj,
						view: this
					},
				});
				$('.modal').css("padding", "0");
				$('.navigationMenu, .reducedtagtask, .verifyonhands').addClass("opacityClass");
				$('.fpControlsPopup-background').css("top", "6%");
			},

			/* SmartList Notification MessageBox */
			showNotificationMessage: function (viewObj, modelObj) {
				viewObj.model = modelObj;
				viewObj.showPopup({
					template: PopupTemplate,
					pageTitle: "Notification",
					renderOptions: {
						model: modelObj,
						view: this
					},
					events: {
						"click #messagePops .okNotification": this.errorNotificationOKClick,
					}
				});

				if (modelObj.notificationMessage === Constants.ScanMsg.INVALID_ITEM) {
					$(".smartNotificationMessage").addClass("smartInvalidMessage");
				}
				$('.navigationMenu, .reducedtagtask, .verifyonhands').addClass("opacityClass");
			},

			errorNotificationOKClick: function () {
				$("#messagePops").modal("hide");
			},

			/* On Hidden remove the applied CSS properties */
			removePops: function () {
				$('.navigationMenu, .verifyonhands, .reducedtagtask').removeClass("opacityClass");
				$('.fpControlsPopup-background').css("top", "0%");
				$('.fpControlsPopup-background').css("visibility", "hidden");
				$('.checkboxChange').removeClass('checkBoxEmptyImage').addClass('checkBoxCompleteImage');
				$('.modal').fadeOut("slow");
			},

			expandAll: function () {
				$(".detailsView").removeClass("hide");
				$(".deptSummary").toggleClass("expandedHeader");
				$(".expand-image").toggleClass("hide");
				$(".collapse-image").toggleClass("hide");
			},


			/* Used by summary and missed scans controllers to load */
			loadDepartmentContent: function (event, currentView, currentThis) {
				var $imageHolderCollection = $(".deptSummary .imageHolder");
				var selectedIndex = $imageHolderCollection.index(event.currentTarget);
				var highSalesAlertHolder = $(".deptSummary .highSalesAlertHolder").eq(selectedIndex);
				var $departmentSummary = $(".deptSummary").eq(selectedIndex);
				var $departmentDetails = $departmentSummary.find('.detailsView');
				var $expandImage = $departmentSummary.find('.expand-image');
				var $collapseImage = $departmentSummary.find('.collapse-image');
				var isElementEmpty = $departmentDetails.children().length === 0;
				if (isElementEmpty) {
					var departmentNumber = $departmentDetails.data("department");
					var elementId = $departmentDetails[0].id;
					currentThis.model.setCurrentDepartment(departmentNumber);
					currentView.renderDepartment("#" + elementId);
				}
				$departmentDetails.toggleClass("hide");
				$expandImage.toggleClass("hide");
				$collapseImage.toggleClass("hide");
				$departmentSummary.toggleClass("expandedHeader");
				if (highSalesAlertHolder.hasClass('highSalesAlertImage') || highSalesAlertHolder.hasClass('highSalesAlertImageOrangeBorder')) {
					highSalesAlertHolder.toggleClass('highSalesAlertImageOrangeBorder');
					highSalesAlertHolder.toggleClass('highSalesAlertImage');
				}
				currentView.refreshIScroll($departmentSummary[0]);
			},
			closeMenuBar : function () {
				$(".navigationMenu").removeClass("open-sidebar");
				$('.main-content').css("opacity", 1);
				$('.navigationMenuBackdrop').remove();
			}
		};
	}
);
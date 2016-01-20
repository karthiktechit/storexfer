"use strict";

define( [
    "backbone",
    "apparch",
    "appGlobal",
],
function ( Backbone, AppArch,App ) {
    var history = {},
        currentRoot = "",
        currentComponent = null,
        components = {};

    /**
        Private method to set the current root-level business component fragment, and handle activating/deactivating
    **/
    function setCurrentRoot(fragment) {
        var state = history[fragment],
            prevComponent = findComponent(currentRoot),
            nextComponent = findComponent(fragment);

        currentRoot = fragment;
        if (!state || !state.length) {
            history[fragment] = [];
        } else {
            fragment = state[state.length - 1];
        }
        return fragment;
    }
    /**
        Private method to find the component which contains a given route
    **/
    function findComponent(route) {
        for (var component in components) {
            component = components[component];
            if (component.hasRoute(route)) {
                return component;
            }
        }
        return null;
    }
    /**
        Private method to navigate to a specific page and passes navigation options
    **/
    function routeTo( page, options ) {
        var component = findComponent(page);
        if (component == null) { return; }

        var currentView = currentComponent != null && currentComponent.getCurrentView(),
            routeParameters = {
                rootRoute: currentRoot,
                navigationOptions: options,
                fromComponent: currentComponent,
                fromRoute: Backbone.history.fragment,
                toRoute: page
            },
            view = component.getView(routeParameters);

        if (currentView) {
            PageView.prepareNavigateFrom.call(currentView, { toRoute: page, navigationOptions: options });
        }
        PageView.prepareNavigateTo.call(view, { fromRoute: Backbone.history.fragment, navigationOptions: options });

        component.routeTo({
            page: view,
            navigationOptions: options,
            fromComponent: currentComponent,
            fromRoute: Backbone.history.fragment,
            toRoute: page
        });

        var now = new Date(),
            padLeft2 = padLeft(2, "0"),
            offset = now.getTimezoneOffset(),
            sign = offset < 0 ? "+" : "-",
            hours = Math.floor(Math.abs(offset) / 60),
            minutes = Math.abs(offset) - hours * 60,
            timestamp = "{0}-{1}-{2}T{3}:{4}:{5}{6}".format(padLeft(now.getFullYear(), 4, "0"),
                padLeft2(now.getMonth()+1),
                padLeft2(now.getDate()),
                padLeft2(now.getHours()),
                padLeft2(now.getMinutes()),
                padLeft2(now.getSeconds()),
                sign+padLeft2(hours)+padLeft2(minutes));

        viewStartTime = new Date();   
    }
    return Backbone.Router.extend({
        routes : {
            ":page": "showPage",
            ":page/*path": "showPage"
        },
        
        initialize: function () {
            this.pages = {};
            this.history = [];
            this.popupHistory = [];
        },
        
        addPages : function(pages) {
          for (var page in pages) {
              this.pages[page] = pages[page];
          }
        },
        
        showPage: function (page, path) {
            page = path ? page + "/" + path : page;
            if (this.pages[page]) {
                this.pages[page].render();
            }
        },
        
        getPage: function(path) {
            return this.pages[path];
        },
              /**
            Handles navigating to a new route
            @param fragment {String} The route fragment with which to navigate
            @param [navigationParameter] {Object} Any navigation parameter object, sent directly to the new route
            @param [options] {Object}
        **/
        navigate: function (fragment,navigationParameter, options) {
            options = options || {};
            if (navigationParameter && navigationParameter.isTopLevel) {
                navigationParameter = null;
                fragment = setCurrentRoot(fragment);
            } else if (!options.ignoreHistory) {
                history[currentRoot].push(fragment);
            }

            routeTo(fragment, navigationParameter);
            currentComponent = findComponent(fragment);
            Backbone.history.navigate(fragment, { trigger: true, replace: true });
            
        },
        popupBack: function() {
            this.navigate(this.popupHistory[this.popupHistory.length-1], true);
        },
        goBack: function() {
            var fragment = Backbone.history.fragment.split("/");
            fragment.pop();
            this.navigate(fragment.join("/"), true);
        }
    });
});
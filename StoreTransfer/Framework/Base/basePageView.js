"use strict";

define(["jquery", "backbone"],function ($, Backbone ) {
    //encapsulates common behaviours for all top level views
    var view = Backbone.View.extend( {
        el: "#app-view",
        templates: [],
        loadTemplatesFile: function () {
        	//------------
        },
         setPageTitle: function(title) {
                this.App.setTitle(title);
            },
        renderTemplate: function(options) {
                options = options || {};
                options = _.extend({
                    element: this.$el,
                    template: '',
                    renderOptions: {}
                }, options);

                _.extend(options.renderOptions, {
                    model: this.model,
                    view: this
                }, options._options);

                $(options.element).html(_.template(options.template, options.renderOptions));

                if (options._options != null) {
                    this.App.logger.error("_options is deprecated, please change to renderOptions");
                }

                $(".modal").on('shown', function () {
                    $(this).find("[autofocus]:first").focus();
                });
            },
             getRelativePath: function(path) {
                return this.viewrequire.toUrl(path);
            },
    });
    return view;
});
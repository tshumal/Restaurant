var App = App || {};

App.controller = App.controller || {};
App.model = App.model || {};
App.view = App.view || {};
App.collection = App.collection || {};

var tpl = {

	    // Hash of preloaded templates for the app
	    templates:{},

	    // Recursively pre-load all the templates for the app.
	    // This implementation should be changed in a production environment. All the template files should be
	    // concatenated in a single file.
	    loadTemplates:function (names, callback) {

	        var that = this;

	        var loadTemplate = function (index) {
	            var name = names[index];
	            console.log('Loading template: ' + name);
	            $.get('src/view/' + name + '.html', function (data) {
	                that.templates[name] = data;
	                index++;
	                if (index < names.length) {
	                    loadTemplate(index);
	                } else {
	                    callback();
	                }
	            });
	        };

	        loadTemplate(0);
	    },

	    // Get template by name from hash of preloaded templates
	    get:function (name) {
	    	console.log('get template: ' + name);
	    	console.log(this.templates[name]);
	        return this.templates[name];
	    }

	};

App.Router = Backbone.Router.extend({

    routes:{
    	"stores":"stores",
        "":"defaultRoute"
    },

    initialize:function () {
    	console.log('Loading App.Router');
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },
    
   
    defaultRoute: function( actions ){
        // The variable passed in matches the variable in the route definition "actions"
    	console.log('Loading defaultRoute + ' + actions);
    },

    stores : function () {
    	console.log('Loading Stores Route');
        this.changePage(new App.controller.StoreList());
    },

    changePage:function (page) {
    	console.log('changePage ' + page);
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    tpl.loadTemplates(['storeList'],
        function () {
    		app = new App.Router();
            Backbone.history.start();
        });
});
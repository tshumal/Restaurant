//Principal object of the application
var App = App || {};
//Initialize principal children
App.controller = App.controller || {};
App.model = App.model || {};
App.collection = App.collection || {};
App.view = App.view || {

    // Hash of preloaded views for the app
    views:{},

    // Recursively pre-load all the views for the app.
    // This implementation should be changed in a production environment. All the views files should be
    // concatenated in a single file.
    loadViews:function (names, callback) {

        var that = this;

        var loadView = function (index) {
            var name = names[index];            
            $.get('src/view/' + name + '.html', function (data) {
                that.views[name] = data;
                index++;
                if (index < names.length) {
                	loadView(index);
                } else {
                    callback();
                }
            });
        };

        loadView(0);
    },

    // Get View by Name from hash of preloaded views
    get:function (name) {
        return this.views[name];
    }
};

App.router = Backbone.Router.extend({

    routes:{
    	"stores":"stores",
    	"*actions":"defaultRoute"
    },

    initialize:function () {
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
    },

    //Predefined Routes
    stores : function () {
        this.changePage(new App.controller.StoreList());
    },
    
    //Every page that not match the router will go to the homePage
    defaultRoute : function () {
    	var transition = $.mobile.defaultPageTransition;
        $.mobile.changePage("#home", {changeHash:false, transition: transition});
    },

    //Uses the change page method of JqueryMobile
    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
	//Preloads every single HTML view, and then starts the application.
    App.view.loadViews(['storeList'],
        function () {
    		app = new App.router();
            Backbone.history.start();
    });
});
var App = App || {};

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
    	console.log('get view: ' + name);
    	console.log('aaa ' + this.views[name]);
        return this.views[name];
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
    App.view.loadViews(['storeList'],
        function () {
    		app = new App.Router();
            Backbone.history.start();
        });
});
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
            $.ajax({
            	  url: 'src/view/' + name + '.html',
            	  success: function (data) {
                      that.views[name] = data;
                      index++;
                      if (index < names.length) {
                    	  loadView(index);
                      } else {
                          callback();
                      }
                  },
            	  cache :false
            	});
        };

        loadView(0);
    },

    // Get View by Name from hash of preloaded views
    get:function (name) {    	
        return this.views[name];
    },
    
    //Uses the change page method of JqueryMobile
    changePage:function (page) {
    	$(page.el).attr('data-role', 'page');
    	$(page.el).html( page.view({model : page.model}) );
    	$('body').append($(page.el));
    	// JQuery Mobile Change Page
        var transition = $.mobile.defaultPageTransition;    	
    	$.mobile.changePage($(page.el), {changeHash:false, transition: transition});    	
    }
};

App.router = Backbone.Router.extend({

    routes:{
    	"stores":"stores",
    	"stores/:id":"store",
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
    	//Initialize the Info        
        var model = new App.collection.StoreCollection();
        model.fetch({dataType : 'jsonp',
        	success:function(data){
        		new App.controller.StoreList({model:data});
        	},
        	error:function(data){
        		console.log("Error App.collection.StoreCollection");
        	}
        });
    },
    
    store : function (id) {
    	//Initialize the Info   
    	var model = new App.model.Store({id:id});        
        model.fetch({dataType : 'jsonp',
            success:function (data) {
                new App.controller.StoreView({model:data});
            },
        	error:function(data){
        		console.log("Error App.model.Store: id[" + id + ']');
        	}
        });
    },
    
    //Every page that not match the router will go to the homePage
    defaultRoute : function () {
    	var transition = $.mobile.defaultPageTransition;
        $.mobile.changePage("#home", {changeHash:false, transition: transition});
    }
});

$(document).ready(function () {
	//Preloads every single HTML view, and then starts the application.
    App.view.loadViews(['storeList','storeView'],
        function () {
    		app = new App.router();
            Backbone.history.start();
    });
});
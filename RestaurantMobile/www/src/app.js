//Principal object of the application
var App = App || {};
//Initialize utils
App.utils = App.utils || {

    // Hash of preloaded properties for the app
    properties:{'serverURL':'http://192.168.0.109:8080/RestaurantServer/rest/api/',
    			'property2':'value2',
    			'property3':'value3'},

    // Get Property by Name from hash of preloaded properties
    getProperty:function (name) {    	
        return this.properties[name];
    },
    
    //Display Validation errors in a specific form
    displayValidationErrors: function (messages) {
    	//Remove all existing validation errors
    	$('label.error').remove();
    	//Check for actual errors to show
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
    },

    //Display Validation error in a specific field
    addValidationError: function (field, message) {
    	//Removes all existing validation errors in the field
    	this.removeValidationError(field);
    	//Select the input with the error
        var input = $('#'+field).parent();
        //Add a label error with the desired message
        var html = '<label for=\"'+field+'\" class=\"error\">'+message+'</label>';
        input.append(html);
    },

    //Remove Validation error in a specific field
    removeValidationError: function (field) {
    	//Remove the label error in the selected input
    	var input = $('#'+field).parent();
    	$('label.error', input).remove();
    }
};
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
    },
    
    //Render a date, specifically the related days with the selected year and month.    
    renderDate:function(fieldName, initialYear, finalYear, initialDate) {
    	var year = $('#'+fieldName+'-year').val();
    	var month = $('#'+fieldName+'-month').val();
    	var day = $('#'+fieldName+'-day').val();
    	
    	var days = 0;
		if (year == '' || month == '')
			days = 31;
		else{
			if (day != ''){
				//Initializes the date object, 
				//with day the month should be provided since 0 to 11
				var date = new Date(year, month-1, day);
				//Set the selected values for a valid date
				year = date.getFullYear();
				month = date.getMonth() + 1;
				day = date.getDate();
			}
			//Obtains the number of days by a given year and month
			//the month should be provided since 1 to 12
			date = new Date(year, month, 0);
    		days = date.getDate();
		}
			
		var dayOptions = $('#'+fieldName+'-day').prop('options');
		dayOptions.length = 0;
		dayOptions[dayOptions.length] = new Option('DD','');
		//The day options are generated every time something changes
		for (var i = 1; i <= days; i++)
			dayOptions[dayOptions.length] = new Option(i,i);
		
		var yearOptions = $('#'+fieldName+'-year').prop('options');
		yearOptions.length = 0;
		yearOptions[yearOptions.length] = new Option('YY','');
		//The year options are generated every time something changes
		//The expected values are between the initial and final year 
		for (var i = initialYear; i <= finalYear; i++)
			yearOptions[yearOptions.length] = new Option(i,i);
		
		//If the initial date is set, it will be selected on the select menus
    	if (initialDate != null){
    		$('#'+fieldName+'-year').val(initialDate.getFullYear());
    		$('#'+fieldName+'-month').val(initialDate.getMonth() + 1);
    		$('#'+fieldName+'-day').val(initialDate.getDate());
    	}
    	//If not the previous selected value is set again if it exists in the predefines values
    	else{
    		//Search for the value in the options of the select
    		var yearExists = 0 != $('#'+fieldName+'-year option[value='+year+']').length;
    		var dayExists = 0 != $('#'+fieldName+'-day option[value='+day+']').length;
    		//Set the previous values
    		$('#'+fieldName+'-year').val((yearExists)?year:'');
    		$('#'+fieldName+'-month').val(month);
    		$('#'+fieldName+'-day').val((dayExists)?day:'');
    	}
    	//Refresh the select menus to show the selected values
    	$('#'+fieldName+'-year').selectmenu('refresh');
		$('#'+fieldName+'-month').selectmenu('refresh');
		$('#'+fieldName+'-day').selectmenu('refresh');
    }
};
//Principal router of the application that handles the navigation purposes of the Application
App.router = Backbone.Router.extend({

    routes:{
    	"stores":"stores",
    	"stores/:id":"store",
    	"reserves":"reserves",
    	"reserves/create":"reserveCreate",
    	"reserves/update/:id":"reserveUpdate",
    	"reserves/:id":"reserve",
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
                new App.controller.StoreDetail({model:data});
            },
        	error:function(data){
        		console.log("Error App.model.Store: id[" + id + ']');
        	}
        });
    },
    
    reserves : function () {
    	//Initialize the Info        
        var model = new App.collection.ReserveCollection();
        model.fetch({dataType : 'jsonp',
        	success:function(data){
        		new App.controller.ReserveList({model:data});
        	},
        	error:function(data){
        		console.log("Error App.collection.ReserveList");
        	}
        });
    },
    
    reserve : function (id) {
    	//Initialize the Info   
    	var model = new App.model.Reserve({id:id});        
        model.fetch({dataType : 'jsonp',
            success:function (data) {
                new App.controller.ReserveDetail({model:data});
            },
        	error:function(data){
        		console.log("Error App.model.Reserve: id[" + id + ']');
        	}
        });
    },
    
    reserveCreate : function () {
    	//Initialize the Info   
    	var model = new App.model.Reserve();
    	new App.controller.ReserveCreate({model:model});
    },
    
    reserveUpdate : function (id) {
    	//Initialize the Info   
    	var model = new App.model.Reserve({id:id});        
        model.fetch({dataType : 'jsonp',
            success:function (data) {
                new App.controller.ReserveUpdate({model:data});
            },
        	error:function(data){
        		console.log("Error App.model.Reserve: id[" + id + ']');
        	}
        });
    },
    
    //Every page that not match the router will go to the homePage
    defaultRoute : function () {
    	var transition = $.mobile.defaultPageTransition;
        $.mobile.changePage("#home", {changeHash:false, transition: transition});
    }
});

//Entry Point of the Application
$(document).ready(function () {
	//Preloads every single HTML view, and then starts the application.
    App.view.loadViews(['storeList','storeDetail',
                        'reserveList','reserveDetail','reserveCreate','reserveUpdate'],
        function () {
    		app = new App.router();
            Backbone.history.start();
    });
});
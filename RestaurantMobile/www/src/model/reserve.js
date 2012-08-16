//Represents a Reserve
App.model.Reserve = Backbone.Model.extend({
	
	urlRoot: App.utils.getProperty('serverURL')+"reserves/",
	
	//Default values for the Reserve
    defaults: {    	
    	id : null,
        numPeople: 0,
        date: new Date(),        
        store: null
    },
    
    //Constructor of the model
    initialize:function () {
    	this.validators();
    	this.changeDate();
    	this.bind("change:date", function(){
    		this.changeDate();
        });
    	this.bind("change:date-year", function(){
    		this.setDate();    		
        });
    	this.bind("change:date-month", function(){
    		this.setDate();
        });
    	this.bind("change:date-day", function(){
    		this.setDate();
        });
    },
    
    //Used to initialize the date related values year, month, day and format
    //Every time the date changes they are refreshed
    changeDate:function (){
    	if (this.get('date') != null){
			var date = new Date(this.get('date'));
			this.set({"date-format":date.getDate() + "/" + (date.getMonth() + 1)+ "/" + date.getFullYear()});
    		this.set({"date-year" : date.getFullYear()});
        	this.set({"date-month" : date.getMonth() + 1});
        	this.set({"date-day" : date.getDate()});
    	}	
    },
    
    //Set a valid date if the model is complete with the three attributes year month and day
    //If the three attributes are not set the 
    //date should be null because it means the date is being edited
    setDate: function(){
    	//Obtains the three attributes
    	var year = this.get('date-year');
    	var month = this.get('date-month');
    	var day = this.get('date-day');
    	//If the date attributes are set.
    	if (year != null && year != '' 
    			&& month != null && month != ''
    			&& day != null && day != ''){
    		var sdate = new Date(year, parseInt(month) - 1, day);
    		this.set({date : sdate});
    	}
    	//If not the date should be null
    	else{
    		this.set({date : null});
    	}	
    },
    
    //Define the field validators
    validators: function(){
        this.validators = {};
        this.validators.numPeople = function (value) {
            if (value < 1 || value > 10 )
            	return {isValid: false, message: "You must enter a valid number of people"};
            else
            	return {isValid: true}; 
        };
        this.validators.date = function (value) {
            if (value == null)
            	return {isValid: false, message: "You must enter a valid date"};
            else
            	return {isValid: true}; 
        };
        this.validators.store = function (value) {
            if (value == null || value == '')
            	return {isValid: false, message: "You must select a store"};
            else
            	return {isValid: true}; 
        };
    },
    
    //Custom Validate single item
    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },
    
    //Custom Validate all elements
    validateAll: function () {
        var messages = {};        
        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    }
});

//Represent a Collection of Reserves
App.collection.ReserveCollection = Backbone.Collection.extend({

	model:App.model.Reserve,

    url:App.utils.getProperty('serverURL')+"reserves",
    
    //Method to be triggered to refresh the data that needs to be formatted
    change:function (){
    	_.each(this.models, function(item){
    		//Data to be refreshed
    		item.trigger("change:date");
    	});
    }
});
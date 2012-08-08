App.model.Reserve = Backbone.Model.extend({

    urlRoot: App.utils.getProperty('serverURL')+"reserves/",
    
    defaults: {
    	id : 0,
        numPeople: 0,
        date: new Date(),
        store: null,
    },    
    
    initialize:function () {
    	this.validators();    	
    	this.bind("change:date", function(){
    		var date = new Date(this.get('date'));
    		this.set({"date_format":date.getDate() + "/" + (date.getMonth() + 1)+ "/" + date.getFullYear()});
        });
    },
    
    validators: function(){
        this.validators = {};
        this.validators.numPeople = function (value) {
            if (value < 1 || value > 10 )
            	return {isValid: false, message: "You must enter a valid number of people"};
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
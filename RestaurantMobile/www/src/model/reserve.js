App.model.Reserve = Backbone.Model.extend({

    urlRoot: App.config.getProperty('serverURL')+"reserves/",
    
    defaults: {
    	id : 0,
        numPeople: 0,
        date: new Date(),
        store: null
    },    
    
    initialize:function () {
    	this.bind("change:date", function(){
    		var date = new Date(this.get('date'));
    		this.set({"date_format":date.getDate() + "/" + (date.getMonth() + 1)+ "/" + date.getFullYear()});
        });
    }
});

App.collection.ReserveCollection = Backbone.Collection.extend({

    model:App.model.Reserve,

    url:App.config.getProperty('serverURL')+"reserves",
    
    //Method to be triggered to refresh the data that needs to be formatted
    change:function (){
    	_.each(this.models, function(item){
    		//Data to be refreshed
    		item.trigger("change:date");
    	});
    }
});